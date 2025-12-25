import { describe, it, expect } from 'vitest';
import { lessonService } from '@/services/lesson.service';

describe('Lesson Service Lifecycle', () => {
  let createdId: string;

  it('should successfully create a new lesson', async () => {
    const res = await lessonService.createLesson({
      title: 'Introduction to CouchDB',
      content: 'This is a lesson content.',
      order: 1,
      boardId: 'board-123',
    });
    createdId = res.id;
    expect(res.ok).toBe(true);
  });

  it('should fetch the lesson by ID', async () => {
    const lesson = await lessonService.getLesson(createdId);
    expect(lesson.title).toBe('Introduction to CouchDB');
  });

  it('should delete the lesson', async () => {
    const res = await lessonService.removeLesson(createdId);
    expect(res.ok).toBe(true);
  });
});
