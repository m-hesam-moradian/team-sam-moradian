import nano from 'nano';

// WRONG: 'http://admin:password@localhost:5984'
// RIGHT: Use the service name from docker-compose
const COUCHDB_URL = 'http://admin:securepassword123@next-couchdb:5984';

const couch = nano(COUCHDB_URL);

export const getDb = () => {
  return couch.use('lms_db');
};
