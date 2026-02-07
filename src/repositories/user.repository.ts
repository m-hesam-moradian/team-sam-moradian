// src/repositories/user.repository.ts
import { getDb } from '@/lib/db/couch';
import type { User } from '@/generated/types';

export const userRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const db = getDb(); // <--- ADD AWAIT
    const response = await db.find({
      selector: { type: 'user', email },
      limit: 1,
    });
    if (response.docs.length === 0) return null;
    return response.docs[0] as unknown as User;
  },

  async findById(id: string): Promise<User | null> {
    const db = getDb(); // <--- ADD AWAIT
    try {
      const doc = await db.get(id);
      return doc as unknown as User;
    } catch (e) {
      return null;
    }
  },

  async create(user: Omit<User, '_id' | '_rev'>) {
    const db = getDb(); // <--- ADD AWAIT
    return await db.insert(user);
  },

  async delete(id: string, rev: string) {
    const db = getDb(); // <--- ADD AWAIT
    return await db.destroy(id, rev);
  },

  async findAll(): Promise<User[]> {
    const db = getDb(); // <--- ADD AWAIT
    const response = await db.find({
      selector: { type: 'user' },
    });
    return response.docs as unknown as User[];
  },

  async countUsers(): Promise<number> {
    const db = getDb();
    const response = await db.find({
      selector: { type: 'user' },
      fields: ['_id'],
    });
    return response.docs.length;
  },
  async update(id: string, data: Partial<User>) {
    const db = getDb();
    const current = await db.get(id);
    return await db.insert({
      ...current,
      ...data,
      _id: id,
      _rev: current._rev, // CouchDB needs the latest revision to update
    });
  },
};
