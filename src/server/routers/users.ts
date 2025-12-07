import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '@/lib/db/couch';

const t = initTRPC.create();

export const userSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  type: z.literal('user'),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['student', 'teacher', 'admin']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

export const usersRouter = t.router({
  list: t.procedure
    .input(
      z
        .object({
          search: z.string().optional(),
          role: z.enum(['student', 'teacher', 'admin']).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      try {
        const users = await db.getUsers(input?.search, input?.role);
        return { success: true, data: users };
      } catch (error) {
        throw new Error(`Failed to list users: ${error}`);
      }
    }),

  create: t.procedure
    .input(userSchema.omit({ _id: true, _rev: true }))
    .mutation(async ({ input }) => {
      try {
        const user = await db.createUser(input);
        return { success: true, data: user };
      } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
      }
    }),

  update: t.procedure.input(userSchema).mutation(async ({ input }) => {
    try {
      const user = await db.updateUser(input);
      return { success: true, data: user };
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }),

  delete: t.procedure.input(z.string()).mutation(async ({ input: id }) => {
    try {
      await db.deleteUser(id);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  }),

  getStats: t.procedure.query(async () => {
    try {
      const stats = await db.getUserStats();
      return { success: true, data: stats };
    } catch (error) {
      throw new Error(`Failed to get stats: ${error}`);
    }
  }),
});

export type UsersRouter = typeof usersRouter;
