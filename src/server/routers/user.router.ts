// src/server/routers/user.router.ts
import { router, publicProcedure } from '@/server/trpc'; // Point to the file we just created
import { createUserSchema } from '@/models/user.model';
import { userAdapter } from '@/adapters/user.adapter';

export const userRouter = router({
  create: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
    return await userAdapter.registerUser(input);
  }),
});
