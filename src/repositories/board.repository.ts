import { getDb } from '@/lib/db/couch';
import type { Board } from '@/generated/types';

export const boardRepository = {
  async findAll(): Promise<Board[]> {
    const db = getDb();
    const response = await db.find({
      selector: { type: 'board' },
    });
    return response.docs as unknown as Board[];
  },

  async create(board: Omit<Board, '_id' | '_rev'>) {
    const db = getDb();
    return await db.insert(board);
  },

  async update(id: string, data: Partial<Board>) {
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

  async findById(id: string): Promise<Board | null> {
    const db = getDb();
    try {
      const doc = await db.get(id);
      return doc as unknown as Board;
    } catch (e) {
      return null;
    }
  },

  async count(): Promise<number> {
    const db = getDb();
    const response = await db.find({
      selector: { type: 'board' },
      fields: ['_id'],
    });
    return response.docs.length;
  },
};
