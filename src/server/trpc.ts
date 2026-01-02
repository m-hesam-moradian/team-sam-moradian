import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
  // ADD THIS BLOCK:
  errorFormatter({ shape, error }) {
    console.error('❌ tRPC Error:', error); // This will print the REAL error in your Docker logs
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
