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
});
