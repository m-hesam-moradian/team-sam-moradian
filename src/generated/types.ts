/* ⚠️ AUTO-GENERATED — DO NOT EDIT (Simulated) */

export interface BaseDocument {
  _id: string;
  _rev?: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends BaseDocument {
  type: 'user';
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

// ADD THESE:
export interface Lesson extends BaseDocument {
  type: 'lesson';
  title: string;
  content?: string;
  order: number;
  boardId: string;
}

export interface Board extends BaseDocument {
  type: 'board';
  title: string;
  description?: string;
  ownerId: string;
}
