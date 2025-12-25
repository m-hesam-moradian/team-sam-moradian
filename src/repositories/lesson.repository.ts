import { getDb } from '@/lib/db/couch';
import type { Lesson } from '@/generated/types';

export const lessonRepository = {
  async findById(id: string): Promise<Lesson | null> {
    const db = getDb();
    try {
      const doc = await db.get(id);
      return doc as unknown as Lesson;
    } catch (e) {
      return null;
    }
  },

  async create(lesson: Omit<Lesson, '_id' | '_rev'>) {
    const db = getDb();
    return await db.insert(lesson);
  },

  async delete(id: string, rev: string) {
    const db = getDb();
    return await db.destroy(id, rev);
  },
};
