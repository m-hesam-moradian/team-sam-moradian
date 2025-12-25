import { getDb } from '@/lib/db/couch';
import type { Board } from '@/generated/types';

export const boardRepository = {
  async findById(id: string): Promise<Board | null> {
    const db = getDb();
    try {
      const doc = await db.get(id);
      return doc as unknown as Board;
    } catch (e) {
      return null;
    }
  },

  async create(board: Omit<Board, '_id' | '_rev'>) {
    const db = getDb();
    return await db.insert(board);
  },

  async delete(id: string, rev: string) {
    const db = getDb();
    return await db.destroy(id, rev);
  },
};
