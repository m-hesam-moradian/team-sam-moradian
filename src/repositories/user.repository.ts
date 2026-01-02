// src/repositories/user.repository.ts
import { getDb } from '@/lib/db/couch';
import type { User } from '@/generated/types';

export const userRepository = {
  // 1. FIND BY EMAIL (The missing piece!)
  async findByEmail(email: string): Promise<User | null> {
    const db = getDb();
    const response = await db.find({
      selector: {
        type: 'user',
        email: email,
      },
      limit: 1,
    });

    if (response.docs.length === 0) return null;
    return response.docs[0] as unknown as User;
  },

  // 2. FIND BY ID
  async findById(id: string): Promise<User | null> {
    const db = getDb();
    try {
      const doc = await db.get(id);
      return doc as unknown as User;
    } catch (e) {
      return null;
    }
  },

  // 3. CREATE
  async create(user: Omit<User, '_id' | '_rev'>) {
    const db = getDb();
    return await db.insert(user);
  },

  // 4. DELETE
  async delete(id: string, rev: string) {
    const db = getDb();
    return await db.destroy(id, rev);
  },
  async findAll(): Promise<User[]> {
    const db = getDb();
    const response = await db.find({
      selector: {
        type: 'user', // This ensures we only get users, not lessons or boards
      },
    });
    return response.docs as unknown as User[];
  },
};
