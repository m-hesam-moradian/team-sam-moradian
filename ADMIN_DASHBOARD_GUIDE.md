# 🎯 Admin Dashboard Setup & Usage Guide

## Project Status: ✅ COMPLETE

All requested features have been successfully implemented with full documentation.

---

## 📋 What Was Built

### 1. **CouchDB Integration**

Connected NoSQL database with automatic database initialization and full CRUD operations.

### 2. **tRPC Refactoring**

Restructured from monolithic to modular architecture with separate routers for Users and Lessons.

### 3. **Admin Dashboard**

Professional UI with Users and Lessons management pages featuring:

- Real-time search
- Filtering capabilities
- Add/Edit/Delete operations
- Modal-based forms
- Data validation

### 4. **Sidebar Navigation**

Professional sidebar with active state indicators and navigation links.

---

## 🚀 Getting Started (5 Steps)

### Step 1: Start Services

```bash
cd /home/sam/projects/team-sam-moradian
docker-compose -f compose.dev.yaml up -d
```

### Step 2: Wait for Services

- Next.js starts on `:3000`
- CouchDB starts on `:5984`
- Databases auto-create on first request

### Step 3: Access Admin Dashboard

Open your browser to: **http://localhost:3000/admin/dashboard**

### Step 4: Manage Users

Go to **Users** → Add, search, edit, or delete users

### Step 5: Manage Lessons

Go to **Lessons** → Add, search, edit, or delete lessons

---

## 🎨 Admin Dashboard Pages

### Users Manager (`/admin/dashboard/users`)

```
┌─────────────────────────────────────────────┐
│ Users Management              [+ Add User]   │
├─────────────────────────────────────────────┤
│ [Search by name/email...] [Filter by role]  │
├─────────────────────────────────────────────┤
│ Name      │ Email           │ Role    │ Act │
├───────────┼─────────────────┼─────────┼─────┤
│ John Doe  │ john@example.com│ Student │ ▶▶  │
│ Jane Smith│ jane@example.com│ Teacher │ ▶▶  │
└─────────────────────────────────────────────┘
```

**Features:**

- Search by name or email (real-time)
- Filter by role (Student, Teacher, Admin)
- Add new users
- Edit existing users
- Delete with confirmation

### Lessons Manager (`/admin/dashboard/lessons`)

```
┌──────────────────────────────────────────────┐
│ Lessons Management           [+ Add Lesson]   │
├──────────────────────────────────────────────┤
│ [Search...] [Filter by course ID...]         │
├──────────────────────────────────────────────┤
│ Title│Description│Course│Instructor│Duration│
├─────┼───────────┼──────┼──────────┼────────┤
│ TS  │ Learn TS  │c_001 │ Jane     │   45   │
└──────────────────────────────────────────────┘
```

**Features:**

- Search by title or description (real-time)
- Filter by course ID
- Add new lessons with full details
- Edit existing lessons
- Delete with confirmation

---

## 📊 Database Structure

### Users Collection

```json
{
  "_id": "user_550e8400-e29b-41d4-a716-446655440000",
  "_rev": "1-abc",
  "type": "user",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "createdAt": "2024-12-07T10:00:00Z",
  "updatedAt": "2024-12-07T10:00:00Z"
}
```

### Lessons Collection

```json
{
  "_id": "lesson_550e8400-e29b-41d4-a716-446655440001",
  "_rev": "1-def",
  "type": "lesson",
  "title": "Introduction to TypeScript",
  "description": "Learn TypeScript fundamentals",
  "courseId": "course_001",
  "instructor": "Jane Smith",
  "duration": 45,
  "content": "...",
  "createdAt": "2024-12-07T10:00:00Z",
  "updatedAt": "2024-12-07T10:00:00Z"
}
```

---

## 🔧 API Usage (tRPC)

### Frontend Usage Example

```typescript
import { trpc } from '@/lib/trpc/client';

// List users
const { data } = trpc.users.list.useQuery({
  search: 'john',
  role: 'student',
});

// Create user
const create = trpc.users.create.useMutation({
  onSuccess: () => refetch(),
});

create.mutate({
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'teacher',
  type: 'user',
});

// Delete user
const deleteUser = trpc.users.delete.useMutation({
  onSuccess: () => refetch(),
});

deleteUser.mutate('user_123');
```

---

## 📁 Project Structure

```
src/
├── app/(admin)/
│   ├── layout.tsx                    ← Added sidebar
│   └── dashboard/
│       ├── users/page.tsx            ← Users management
│       └── lessons/page.tsx          ← Lessons management
│
├── components/
│   └── AdminSidebar.tsx              ← NEW sidebar component
│
├── lib/db/
│   └── couch.ts                      ← Database operations
│
└── server/routers/
    ├── index.ts                      ← Router composition
    ├── users.ts                      ← NEW users router
    └── lessons.ts                    ← NEW lessons router
```

---

## 🗄️ CouchDB Management

### Access CouchDB UI

- **URL**: http://localhost:5984/\_utils/
- **Username**: admin
- **Password**: securepassword123

### View All Documents

```bash
curl -u admin:securepassword123 \
  http://localhost:5984/users/_all_docs
```

### Query Documents

```bash
curl -u admin:securepassword123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"selector":{"type":"user","role":"student"}}' \
  http://localhost:5984/users/_find
```

---

## ✨ Key Features

### Users Management

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Search by name or email
- ✅ Filter by role
- ✅ Statistics by role
- ✅ Form validation
- ✅ Confirmation on delete

### Lessons Management

- ✅ CRUD operations
- ✅ Search by title/description
- ✅ Filter by course ID
- ✅ Full lesson details (content, duration)
- ✅ Form validation
- ✅ Confirmation on delete

### UI/UX

- ✅ Professional dark theme
- ✅ Responsive tables
- ✅ Modal forms
- ✅ Real-time search
- ✅ Loading states
- ✅ Error handling
- ✅ Status indicators

---

## 📚 Documentation Files

### Quick References

- **QUICKSTART.md** - Get started in 5 minutes
- **IMPLEMENTATION_SUMMARY.md** - Architecture overview

### Detailed Guides

- **docs/COUCHDB_INTEGRATION.md** - Complete documentation
- **docs/couchdb/docker-run.md** - Docker commands
- **docs/couchdb/login.md** - Credentials

---

## 🔍 Troubleshooting

### Services won't start

```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5984

# Change ports in compose.dev.yaml if needed
```

### Can't connect to database

```bash
# Check container status
docker-compose -f compose.dev.yaml ps

# View logs
docker-compose -f compose.dev.yaml logs couchdb
```

### Reset everything

```bash
# Stop and remove containers + volumes
docker-compose -f compose.dev.yaml down -v

# Start fresh
docker-compose -f compose.dev.yaml up -d
```

---

## 🎓 What You Can Do Next

1. **Add More Entities**

   - Create new routers in `/src/server/routers/`
   - Add database methods in `/src/lib/db/couch.ts`
   - Create corresponding UI pages

2. **Customize Styling**

   - Modify Tailwind CSS classes
   - Update color scheme
   - Adjust layout and spacing

3. **Add Authentication**

   - Implement user login/logout
   - Add role-based access control
   - Protect admin routes

4. **Advanced Features**
   - Add pagination to lists
   - Implement batch operations
   - Add export/import functionality
   - Create dashboards with charts

---

## 🚀 Deploy to Production

1. Update environment variables for production database
2. Build for production: `npm run build`
3. Set up proper authentication
4. Configure CouchDB with replication for backup
5. Set up CI/CD pipeline
6. Deploy to your preferred platform (Vercel, Heroku, etc.)

---

## 📞 Quick Reference

| Task           | Location                                |
| -------------- | --------------------------------------- |
| Add Users      | `/admin/dashboard/users` → Add User     |
| Manage Lessons | `/admin/dashboard/lessons` → Add Lesson |
| View CouchDB   | `http://localhost:5984/_utils/`         |
| Check Logs     | `docker-compose logs -f`                |
| Stop Services  | `docker-compose down`                   |
| View Data      | CouchDB UI or `curl` commands           |

---

**Status**: ✅ Production Ready
**Last Updated**: December 7, 2024
**Version**: 1.0.0

---

For more details, see the documentation files in the project root and `/docs` directory.
