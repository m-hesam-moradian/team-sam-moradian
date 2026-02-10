import { lessonRepository } from '@/repositories/lesson.repository';
import { Lesson } from '@/generated/types';

export const lessonService = {
  async getLesson(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) return null;
    return lesson;
  },
  async getAllLessons() {
    return await lessonRepository.findAll();
  },

  async createLesson(input: { title: string; order: number; boardId: string }) {
    return await lessonRepository.create({
      ...input,
      type: 'lesson',
      createdAt: new Date().toISOString(),
    });
  },

  async updateLesson(id: string, input: Partial<Lesson>) {
    return await lessonRepository.update(id, input);
  },

  async removeLesson(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new Error('LESSON_NOT_FOUND');
    return await lessonRepository.delete(id, lesson._rev!);
  },
  async getStats() {
    const count = await lessonRepository.count(); // Ensure count() exists in lesson repo
    return { totalLessons: count };
  },
};
