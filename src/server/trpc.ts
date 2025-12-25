// src/server/trpc.ts
import { initTRPC } from '@trpc/server';

// 1. Initialize tRPC
const t = initTRPC.create();

// 2. Export reusable helpers
export const router = t.router;
export const publicProcedure = t.procedure;
