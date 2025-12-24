import { lessonRepository } from '@/repositories/lesson.repository';

export const lessonService = {
  async createLesson(input: { title: string; content?: string; order: number; boardId: string }) {
    const newLesson = {
      ...input,
      type: 'lesson' as const,
      createdAt: new Date().toISOString(),
    };
    return await lessonRepository.create(newLesson);
  },

  async getLesson(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new Error('LESSON_NOT_FOUND');
    return lesson;
  },

  async removeLesson(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new Error('LESSON_NOT_FOUND');
    return await lessonRepository.delete(id, lesson._rev!);
  },
};
