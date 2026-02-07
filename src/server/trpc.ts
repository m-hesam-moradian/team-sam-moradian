import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// v11 Initialization
const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ tRPC Error:', error);
    }
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
