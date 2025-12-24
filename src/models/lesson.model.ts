// src/models/lesson.model.ts
import { z } from 'zod';

export const lessonModel = {
  name: 'lesson',
  fields: {
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().optional(),
    order: z.number().int(),
    boardId: z.string(), // Which board does this lesson belong to?
  },
};

export const createLessonSchema = z.object({
  title: lessonModel.fields.title,
  content: lessonModel.fields.content,
  order: lessonModel.fields.order,
  boardId: lessonModel.fields.boardId,
});
