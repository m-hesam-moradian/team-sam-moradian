import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '@/lib/db/couch';

const t = initTRPC.create();

export const lessonSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  type: z.literal('lesson'),
  title: z.string().min(1),
  description: z.string().optional(),
  courseId: z.string(),
  content: z.string().optional(),
  instructor: z.string(),
  duration: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonsRouter = t.router({
  list: t.procedure
    .input(
      z
        .object({
          search: z.string().optional(),
          courseId: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      try {
        const lessons = await db.getLessons(input?.search, input?.courseId);
        return { success: true, data: lessons };
      } catch (error) {
        throw new Error(`Failed to list lessons: ${error}`);
      }
    }),

  create: t.procedure
    .input(lessonSchema.omit({ _id: true, _rev: true }))
    .mutation(async ({ input }) => {
      try {
        const lesson = await db.createLesson(input);
        return { success: true, data: lesson };
      } catch (error) {
        throw new Error(`Failed to create lesson: ${error}`);
      }
    }),

  update: t.procedure.input(lessonSchema).mutation(async ({ input }) => {
    try {
      const lesson = await db.updateLesson(input);
      return { success: true, data: lesson };
    } catch (error) {
      throw new Error(`Failed to update lesson: ${error}`);
    }
  }),

  delete: t.procedure.input(z.string()).mutation(async ({ input: id }) => {
    try {
      await db.deleteLesson(id);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete lesson: ${error}`);
    }
  }),
});

export type LessonsRouter = typeof lessonsRouter;
