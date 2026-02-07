import { router, publicProcedure } from '@/server/trpc';
import { z } from 'zod';
import { createBoardSchema } from '@/models/board.model';
import { boardAdapter } from '@/adapters/board.adapter';

export const boardRouter = router({
  getAll: publicProcedure.query(async () => {
    return await boardAdapter.list();
  }),
  create: publicProcedure.input(createBoardSchema).mutation(async ({ input }) => {
    return await boardAdapter.create(input);
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await boardAdapter.delete(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      return await boardAdapter.update(input.id, input.title);
    }),
  getStats: publicProcedure.query(async () => {
    return await boardAdapter.getStats();
  }),
});
