# CouchDB Integration Setup Guide

## Overview

This guide explains how to set up and use the CouchDB integration with the tRPC backend for the admin dashboard CRUD operations.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (v18+) and pnpm installed
- The project already has `nano` (CouchDB client) installed

## Getting Started

### 1. Start CouchDB and the Application

Use Docker Compose to start both the Next.js application and CouchDB:

```bash
docker-compose -f compose.dev.yaml up -d
```

This will:

- Start CouchDB on `http://localhost:5984`
- Start the Next.js app on `http://localhost:3000`
- Create the `users` and `lessons` databases automatically (on first API call)

### 2. Access CouchDB Admin UI

Open your browser and go to:

- **URL**: `http://localhost:5984/_utils/`
- **Username**: `admin`
- **Password**: `securepassword123`

Here you can:

- View and manage databases
- Inspect documents
- Run queries

### 3. Environment Variables

The project uses these environment variables (already set in `.env`):

```dotenv
COUCHDB_URL="http://couchdb:5984"  # For Docker: use service name 'couchdb'
COUCHDB_USER="admin"
COUCHDB_PASSWORD="securepassword123"
```

For local development without Docker:

```dotenv
COUCHDB_URL="http://admin:securepassword123@localhost:5984"
```

## Architecture

### Database Structure

#### Users Database (`users`)

Documents have the following structure:

```typescript
{
  _id: "user_<uuid>",      // Auto-generated unique ID
  _rev: "<revision>",       // CouchDB revision field (auto-managed)
  type: "user",             // Document type discriminator
  name: string,             // User's full name
  email: string,            // User's email
  role: "student" | "teacher" | "admin",
  createdAt: Date,          // Creation timestamp
  updatedAt: Date           // Last update timestamp
}
```

#### Lessons Database (`lessons`)

Documents have the following structure:

```typescript
{
  _id: "lesson_<uuid>",     // Auto-generated unique ID
  _rev: "<revision>",       // CouchDB revision field (auto-managed)
  type: "lesson",           // Document type discriminator
  title: string,            // Lesson title
  description?: string,     // Optional description
  content?: string,         // Lesson content/body
  courseId: string,         // Related course ID
  instructor: string,       // Instructor name
  duration?: number,        // Duration in minutes
  createdAt: Date,          // Creation timestamp
  updatedAt: Date           // Last update timestamp
}
```

### tRPC Router Structure

The application uses two main routers:

#### `/src/server/routers/users.ts`

- `users.list(input?)` - List users with optional search and role filter
- `users.create(data)` - Create a new user
- `users.update(data)` - Update an existing user
- `users.delete(id)` - Delete a user
- `users.getStats()` - Get user statistics by role

#### `/src/server/routers/lessons.ts`

- `lessons.list(input?)` - List lessons with optional search and course filter
- `lessons.create(data)` - Create a new lesson
- `lessons.update(data)` - Update an existing lesson
- `lessons.delete(id)` - Delete a lesson

### Database Layer

**File**: `/src/lib/db/couch.ts`

Provides the following methods:

- `db.init()` - Initialize databases
- `db.getUsers(search?, role?)` - Query users with filters
- `db.createUser(user)` - Create user
- `db.updateUser(user)` - Update user
- `db.deleteUser(id)` - Delete user
- `db.getLessons(search?, courseId?)` - Query lessons with filters
- `db.createLesson(lesson)` - Create lesson
- `db.updateLesson(lesson)` - Update lesson
- `db.deleteLesson(id)` - Delete lesson

## Using the Admin Dashboard

### Access the Admin Panel

1. Navigate to `http://localhost:3000/admin/dashboard`
2. You'll see the sidebar navigation with three options:
   - Dashboard
   - Users
   - Lessons

### Users Management

**URL**: `/admin/dashboard/users`

Features:

- **Search**: Search users by name or email in real-time
- **Filter by Role**: Filter users by student, teacher, or admin
- **Add User**: Click "Add User" button to open form
  - Required: Name, Email, Role
  - Click "Save" to create
- **Edit User**: Click "Edit" button on any user row
  - Modify fields and save changes
- **Delete User**: Click "Delete" button to remove
  - Requires confirmation

### Lessons Management

**URL**: `/admin/dashboard/lessons`

Features:

- **Search**: Search lessons by title or description in real-time
- **Filter by Course**: Filter lessons by course ID
- **Add Lesson**: Click "Add Lesson" button to open form
  - Required: Title, Course ID, Instructor
  - Optional: Description, Content, Duration
  - Click "Save" to create
- **Edit Lesson**: Click "Edit" button on any lesson row
  - Modify fields and save changes
- **Delete Lesson**: Click "Delete" button to remove
  - Requires confirmation

## API Usage Examples

### Using tRPC Client

The client is configured in `/src/lib/trpc/client.ts`:

```typescript
import { trpc } from '@/lib/trpc/client';

// List users with search
const { data: users } = trpc.users.list.useQuery({
  search: 'john',
  role: 'student',
});

// Create user
const createUser = trpc.users.create.useMutation({
  onSuccess: () => {
    // Refetch data
    refetch();
  },
});

createUser.mutate({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  type: 'user',
});

// Update user
const updateUser = trpc.users.update.useMutation({
  onSuccess: () => refetch(),
});

updateUser.mutate({
  _id: 'user_123',
  _rev: 'rev_123',
  name: 'Updated Name',
  email: 'new@example.com',
  role: 'teacher',
  type: 'user',
});

// Delete user
const deleteUser = trpc.users.delete.useMutation({
  onSuccess: () => refetch(),
});

deleteUser.mutate('user_123');
```

## Querying CouchDB Directly

### Using curl

```bash
# Get all users
curl -u admin:securepassword123 \
  http://localhost:5984/users/_all_docs

# Get a specific document
curl -u admin:securepassword123 \
  http://localhost:5984/users/user_<uuid>

# Query with Mango syntax
curl -u admin:securepassword123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"selector":{"type":"user","role":"student"}}' \
  http://localhost:5984/users/_find
```

### Using the CouchDB UI

1. Go to `http://localhost:5984/_utils/`
2. Select database (users or lessons)
3. Click "Run Query" to execute a Mango query:

```json
{
  "selector": {
    "type": "user",
    "role": { "$eq": "student" }
  },
  "fields": ["name", "email", "role"]
}
```

## Troubleshooting

### Database not initializing

- Check if CouchDB container is running: `docker-compose ps`
- Check logs: `docker-compose logs couchdb`
- Ensure credentials are correct in `.env`

### Can't connect to CouchDB from app

- Check network: `docker network ls`
- Verify `COUCHDB_URL` uses correct container name for Docker setup
- For local development, use `http://admin:password@localhost:5984`

### Documents not appearing

- Check document type field matches selector in queries
- Verify documents were actually inserted (check UI)
- Ensure proper indexing for complex queries

### Performance issues

- Large datasets may need pagination (consider implementing limit/skip)
- Create indexes for frequently queried fields in CouchDB UI
- Consider implementing view-based queries for complex aggregations

## Best Practices

1. **Always include type field** - Used for document discrimination
2. **Validate data** - Zod schemas are used for all inputs
3. **Handle revisions** - Always include `_rev` when updating/deleting
4. **Use proper timestamps** - CouchDB doesn't store timezone info, use ISO strings
5. **Keep documents flat** - Avoid deeply nested structures for better performance
6. **Index frequently queried fields** - Use CouchDB's Mango indexing

## Additional Resources

- [CouchDB Documentation](https://docs.couchdb.org/)
- [Nano Client Library](https://github.com/apache/couchdb-nano)
- [tRPC Documentation](https://trpc.io/)
- [Zod Documentation](https://zod.dev/)
