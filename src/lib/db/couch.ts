import Nano from 'nano';

// 1. Get credentials from environment variables (or defaults for local dev)
// Note: In a real app, never hardcode passwords. This default is just for your local docker setup.
const COUCHDB_URL = process.env.COUCHDB_URL || 'http://admin:securepassword123@localhost:5984';
const DB_NAME = process.env.COUCHDB_DB || 'lms_db';

let nano: Nano.ServerScope | undefined;

export const getDb = () => {
  // Singleton pattern: don't create a new connection every time
  if (!nano) {
    nano = Nano(COUCHDB_URL);
  }

  // Connect to the specific database
  const db = nano.use(DB_NAME);
  return db;
};
