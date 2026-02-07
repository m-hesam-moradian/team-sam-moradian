import { router, publicProcedure } from '@/server/trpc';
import { z } from 'zod';
import { createUserSchema } from '@/models/user.model';
import { userAdapter } from '@/adapters/user.adapter';

export const userRouter = router({
  // READ
  getAll: publicProcedure.query(async () => {
    return await userAdapter.listUsers();
  }),

  // CREATE
  create: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
    return await userAdapter.createUser(input);
  }),

  // DELETE
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await userAdapter.deleteUser(input);
  }),

  getStats: publicProcedure.query(async () => {
    return await userAdapter.getStats();
  }),
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await userAdapter.updateUser(id, data);
    }),
});
