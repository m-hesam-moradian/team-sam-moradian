import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  getUserStats: t.procedure.query(async () => {
    return {
      data: {
        total: 0,
        byRole: {
          student: 0,
          teacher: 0,
          admin: 0,
        },
      },
    };
  }),

  getUsers: t.procedure.query(async () => {
    return {
      data: [],
    };
  }),
});

export type AppRouter = typeof appRouter;
