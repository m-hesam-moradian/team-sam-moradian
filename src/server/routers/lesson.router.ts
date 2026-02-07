import { router, publicProcedure } from '@/server/trpc';
import { z } from 'zod';
import { createLessonSchema } from '@/models/lesson.model';
import { lessonAdapter } from '@/adapters/lesson.adapter';

export const lessonRouter = router({
  getAll: publicProcedure.query(async () => {
    return await lessonAdapter.listLessons();
  }),

  create: publicProcedure.input(createLessonSchema).mutation(async ({ input }) => {
    return await lessonAdapter.createLesson(input);
  }),

  update: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await lessonAdapter.updateLesson(id, data);
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await lessonAdapter.deleteLesson(input);
  }),
  getStats: publicProcedure.query(async () => {
    return await lessonAdapter.getStats();
  }),
});
