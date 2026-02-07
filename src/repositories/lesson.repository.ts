import { getDb } from '@/lib/db/couch';
import type { Lesson } from '@/generated/types';

export const lessonRepository = {
  async findAll(): Promise<Lesson[]> {
    const db = getDb();
    const response = await db.find({
      selector: { type: 'lesson' },
    });
    return response.docs as unknown as Lesson[];
  },

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

  async update(id: string, data: Partial<Lesson>) {
    const db = getDb();
    const current = await db.get(id);
    return await db.insert({
      ...current,
      ...data,
      _id: id,
      _rev: current._rev,
    });
  },

  async delete(id: string, rev: string) {
    const db = getDb();
    return await db.destroy(id, rev);
  },
  async count(): Promise<number> {
    const db = getDb();
    const response = await db.find({
      selector: { type: 'lesson' }, // MUST be 'lesson'
      fields: ['_id'],
    });
    return response.docs.length;
  },
};
