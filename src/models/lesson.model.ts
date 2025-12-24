import { z } from 'zod';

export const lessonSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  order: z.number(),
});

export type LessonInput = z.infer<typeof lessonSchema>;
