import { initTRPC } from '@trpc/server';
import { usersRouter } from './users';
import { lessonsRouter } from './lessons';

const t = initTRPC.create();

export const appRouter = t.router({
  users: usersRouter,
  lessons: lessonsRouter,
});

export type AppRouter = typeof appRouter;
