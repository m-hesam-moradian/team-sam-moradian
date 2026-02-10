// src/adapters/lesson.adapter.ts
import { lessonService } from '@/services/lesson.service';

export const lessonAdapter = {
  // GET ALL
  list: async () => {
    return await lessonService.getAllLessons();
  },

  // GET ONE (The missing piece for REST [id] routes)
  get: async (id: string) => {
    return await lessonService.getLesson(id);
  },

  create: async (input: any) => {
    return await lessonService.createLesson(input);
  },

  update: async (id: string, input: any) => {
    return await lessonService.updateLesson(id, input);
  },

  delete: async (id: string) => {
    return await lessonService.removeLesson(id);
  },

  getStats: async () => {
    return await lessonService.getStats();
  },
};
