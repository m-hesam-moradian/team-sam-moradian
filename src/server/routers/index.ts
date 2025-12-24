// src/server/routers/index.ts
import { router } from '@/server/trpc'; // Point to the new file
import { userRouter } from './user.router';

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
