// src/__tests__/setup.ts
import { beforeAll } from 'vitest';
import nano from 'nano';

const COUCHDB_URL = 'http://admin:securepassword123@localhost:5984';
const couch = nano(COUCHDB_URL);

export async function ensureDatabaseExists(dbName: string) {
  try {
    await couch.db.create(dbName);
  } catch (err: any) {
    if (err.statusCode !== 412) console.error('DB Setup Error:', err);
  }
}

// This runs ONCE before all tests in any file
beforeAll(async () => {
  await ensureDatabaseExists('lms_db');
});
