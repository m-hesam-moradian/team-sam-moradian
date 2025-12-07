# Quick Start Guide

## 1. Start the Application

```bash
# Navigate to project directory
cd /home/sam/projects/team-sam-moradian

# Start Docker containers (CouchDB + Next.js)
docker-compose -f compose.dev.yaml up -d

# Wait for services to start (~10 seconds)
```

## 2. Access the Application

- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Users Manager**: http://localhost:3000/admin/dashboard/users
- **Lessons Manager**: http://localhost:3000/admin/dashboard/lessons
- **CouchDB UI**: http://localhost:5984/\_utils/ (admin/securepassword123)

## 3. Test the Application

### Add a User

1. Go to http://localhost:3000/admin/dashboard/users
2. Click "Add User" button
3. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Role**: Student
4. Click "Save"

### Search Users

1. In the Users page, type in the search field
2. Results update in real-time

### Add a Lesson

1. Go to http://localhost:3000/admin/dashboard/lessons
2. Click "Add Lesson" button
3. Fill in the form:
   - **Title**: Introduction to TypeScript
   - **Course ID**: course_001
   - **Instructor**: Jane Smith
   - **Description**: Learn TypeScript basics
   - **Duration**: 45
4. Click "Save"

### Edit/Delete

- Click "Edit" to modify any record
- Click "Delete" to remove (requires confirmation)

## 4. View Data in CouchDB

1. Go to http://localhost:5984/\_utils/
2. Login with admin/securepassword123
3. Select "users" or "lessons" database
4. Click "Run Query" to see all documents

## 5. Stop Services

```bash
# Stop all containers
docker-compose -f compose.dev.yaml down

# Stop and remove volumes (WARNING: deletes data)
docker-compose -f compose.dev.yaml down -v
```

## Common Tasks

### Check Container Status

```bash
docker-compose -f compose.dev.yaml ps
```

### View Logs

```bash
# All services
docker-compose -f compose.dev.yaml logs -f

# Only Next.js
docker-compose -f compose.dev.yaml logs -f next-app

# Only CouchDB
docker-compose -f compose.dev.yaml logs -f couchdb
```

### Restart Services

```bash
docker-compose -f compose.dev.yaml restart
```

### Reset Everything

```bash
# Remove containers and volumes
docker-compose -f compose.dev.yaml down -v

# Start fresh
docker-compose -f compose.dev.yaml up -d
```

## Troubleshooting

### Port 3000 or 5984 already in use

```bash
# Change ports in compose.dev.yaml
# For example: change "3000:3000" to "3001:3000"
```

### App can't connect to CouchDB

1. Check if containers are running: `docker-compose ps`
2. Check logs: `docker-compose logs couchdb`
3. Verify network: `docker network ls`

### Data disappeared

- Check if volumes are mounted correctly
- Don't use `down -v` unless you want to delete data

## Next Steps

- See [COUCHDB_INTEGRATION.md](./COUCHDB_INTEGRATION.md) for detailed documentation
- Explore the admin dashboard features
- Customize schemas in `/src/server/routers/`
- Add more CRUD operations as needed
