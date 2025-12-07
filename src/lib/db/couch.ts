import Nano from 'nano';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/server/routers/users';
import { Lesson } from '@/server/routers/lessons';

const COUCH_URL = process.env.COUCHDB_URL || 'http://admin:securepassword123@localhost:5984';
const nano = Nano(COUCH_URL);

const USERS_DB = 'users';
const LESSONS_DB = 'lessons';

let usersDb: Nano.DocumentScope<User>;
let lessonsDb: Nano.DocumentScope<Lesson>;

// Initialize databases
async function initDb() {
  try {
    // Create databases if they don't exist
    const dbs = await nano.db.list();
    if (!dbs.includes(USERS_DB)) {
      await nano.db.create(USERS_DB);
    }
    if (!dbs.includes(LESSONS_DB)) {
      await nano.db.create(LESSONS_DB);
    }

    usersDb = nano.db.use<User>(USERS_DB);
    lessonsDb = nano.db.use<Lesson>(LESSONS_DB);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Users operations
export const db = {
  async init() {
    await initDb();
  },

  // Users CRUD
  async getUsers(search?: string, role?: string): Promise<User[]> {
    try {
      const result = await usersDb.find({
        selector: {
          type: 'user',
          ...(search && {
            $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
          }),
          ...(role && { role }),
        },
      });
      return result.docs;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async createUser(user: Omit<User, '_id' | '_rev'>): Promise<User> {
    const id = `user_${uuidv4()}`;
    const newUser: User = {
      ...user,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await usersDb.insert(newUser);
    return { ...newUser, _rev: result.rev };
  },

  async updateUser(user: User): Promise<User> {
    if (!user._id) throw new Error('User must have an _id');
    const updated: User = {
      ...user,
      updatedAt: new Date(),
    };
    const result = await usersDb.insert(updated);
    return { ...updated, _rev: result.rev };
  },

  async deleteUser(id: string): Promise<void> {
    const user = await usersDb.get(id);
    await usersDb.destroy(id, user._rev!);
  },

  async getUserStats(): Promise<{
    total: number;
    byRole: { student: number; teacher: number; admin: number };
  }> {
    try {
      const users = await this.getUsers();
      const byRole = {
        student: users.filter((u) => u.role === 'student').length,
        teacher: users.filter((u) => u.role === 'teacher').length,
        admin: users.filter((u) => u.role === 'admin').length,
      };
      return {
        total: users.length,
        byRole,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return { total: 0, byRole: { student: 0, teacher: 0, admin: 0 } };
    }
  },

  // Lessons CRUD
  async getLessons(search?: string, courseId?: string): Promise<Lesson[]> {
    try {
      const result = await lessonsDb.find({
        selector: {
          type: 'lesson',
          ...(search && {
            $or: [{ title: { $regex: search } }, { description: { $regex: search } }],
          }),
          ...(courseId && { courseId }),
        },
      });
      return result.docs;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  },

  async createLesson(lesson: Omit<Lesson, '_id' | '_rev'>): Promise<Lesson> {
    const id = `lesson_${uuidv4()}`;
    const newLesson: Lesson = {
      ...lesson,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await lessonsDb.insert(newLesson);
    return { ...newLesson, _rev: result.rev };
  },

  async updateLesson(lesson: Lesson): Promise<Lesson> {
    if (!lesson._id) throw new Error('Lesson must have an _id');
    const updated: Lesson = {
      ...lesson,
      updatedAt: new Date(),
    };
    const result = await lessonsDb.insert(updated);
    return { ...updated, _rev: result.rev };
  },

  async deleteLesson(id: string): Promise<void> {
    const lesson = await lessonsDb.get(id);
    await lessonsDb.destroy(id, lesson._rev!);
  },
};

// Auto-initialize on module load
initDb().catch((error) => {
  console.error('Database initialization failed:', error);
});
