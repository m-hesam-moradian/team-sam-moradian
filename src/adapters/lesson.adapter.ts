import { lessonService } from '@/services/lesson.service';

export const lessonAdapter = {
  listLessons: async () => {
    return await lessonService.getAllLessons();
  },
  createLesson: async (input: any) => {
    return await lessonService.createLesson(input);
  },
  updateLesson: async (id: string, input: any) => {
    return await lessonService.updateLesson(id, input);
  },
  deleteLesson: async (id: string) => {
    return await lessonService.removeLesson(id);
  },
  getStats: async () => {
    return await lessonService.getStats();
  },
};
