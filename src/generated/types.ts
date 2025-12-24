/* ⚠️ AUTO-GENERATED — DO NOT EDIT (Simulated for now) */

// Every item in CouchDB has these fields
export interface BaseDocument {
  _id: string;
  _rev?: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

// The Typescript shape of a User
export interface User extends BaseDocument {
  type: 'user';
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}
export interface Lesson extends BaseDocument {
  type: 'lesson';
  title: string;
  description: string;
  order: number;
}
