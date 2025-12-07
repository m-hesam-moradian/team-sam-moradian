## 🚀 LMS Project

This is the official repository for the **Learner Management System (LMS)**, a modern, full-stack application built for efficient content delivery and student progress tracking.

---

## ✨ Features

- **Modular Course Management:** Easily create, organize, and manage courses, modules, and lessons.
- **Progress Tracking:** Comprehensive student progress monitoring and analytics.
- **User Roles:** Separate roles for **Administrators**, **Instructors**, and **Students**.
- **Scalable Architecture:** Designed for performance and easy scaling using modern technologies.
- **Admin Dashboard:** Professional admin panel with Users and Lessons management (NEW)
  - Complete CRUD operations for users and lessons
  - Real-time search and advanced filtering
  - Sidebar navigation with active states
  - Modal-based forms with validation
  - Dark theme UI with responsive design

---

## 🛠️ Tech Stack

This project leverages a robust and contemporary set of tools:

| Category        | Technology         | Description                                                                                                |
| :-------------- | :----------------- | :--------------------------------------------------------------------------------------------------------- |
| **Frontend**    | **Next.js**        | React framework for server-side rendering and static generation.                                           |
|                 | **TypeScript**     | Adds static typing for improved code quality and maintainability.                                          |
| **Database**    | **Apache CouchDB** | NoSQL document database known for its peer-to-peer synchronization and scalability.                        |
| **API/Backend** | **Apollo GraphQL** | Primary API layer for flexible and efficient data fetching.                                                |
|                 | **Rest API**       | Secondary API for specific services or traditional endpoints.                                              |
|                 | **tRPC**           | For type-safe end-to-end communication between the Next.js client and server logic.                        |
| **Deployment**  | **Docker**         | Containerization for consistent and reproducible environments across development, staging, and production. |

---

## 🏗️ Project Structure

The project follows a standard Next.js structure augmented with specific directories for API definitions and documentation:

```text
lms-project/
├── .env.local
├── .gitignore
├── docker-compose.yml
├── next.config.js
├── package.json
├── tsconfig.json
│
├── **src/**                               # Core backend + shared logic
│   ├── **app/**                           # Next.js UI + routing (frontend)
│   │   ├── (public)/
│   │   ├── (dashboard)/
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       └── layout.tsx
│   │   ├── api/                           # REST endpoints (auto-generated)
│   │   ├── graphql/                       # GraphQL handler (auto-generated)
│   │   ├── trpc/                          # TRPC handler + router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── **models/**                        # ⭐ SSOT (source of truth)
│   │   ├── user.model.ts
│   │   ├── course.model.ts
│   │   ├── lesson.model.ts
│   │   └── index.ts                       # exports models
│   │
│   ├── **generated/**                     # ⚠️ AUTO-GENERATED — DO NOT EDIT
│   │   ├── types.ts                       # TS types from models
│   │   ├── schemas.ts                     # Zod schemas
│   │   ├── couch/                         # CouchDB adapters per model
│   │   ├── rest/                          # REST CRUD handlers
│   │   ├── graphql/                       # SDL + Resolvers
│   │   ├── trpc/                          # Routers + procedures
│   │   └── ui/                            # Auto UI forms (optional)
│   │
│   ├── **lib/**
│   │   ├── couch.ts                       # nano client wrapper
│   │   ├── auth.ts                        # JWT/Session + RBAC
│   │   ├── validations.ts
│   │   └── codegen.ts                     # runtime/cli codegen engine
│   │
│   ├── **services/**                      # Business logic layer
│   │   ├── search.ts
│   │   └── mailer.ts
│   │
│   ├── **components/**                    # Shared React components
│   │   ├── forms/
│   │   └── ui/
│   │
│   ├── **utils/**                         # Small helpers
│   ├── **types/**                         # global TS types
│   └── **scripts/**
│       └── gen.ts                         # CLI → `npm run gen`
│
├── **database/**
│   ├── config.json                        # CouchDB URLs & settings
│   ├── init.js                            # init + migrations
│   └── seed/                              # initial documents
│
├── **api/**                               # (Optional unified API layer)
│   ├── graphql/
│   ├── rest/
│   └── trpc/
│
└── **docs/**
    ├── architecture.md
    ├── setup.md
    └── auth-system.md
```

---

## ⚙️ Setup and Installation

### Prerequisites

You need the following installed on your system:

- **Node.js** (LTS version)
- **npm** or **Yarn**
- **Docker** and **Docker Compose**

### Steps

1.  **Clone the Repository:**

    ```bash
    git clone [Your Repository URL]
    cd lms-project
    ```

2.  **Configure Environment:**
    Create a `.env.local` file based on the provided `.env.example` and fill in necessary configuration details (e.g., CouchDB connection strings, secret keys).

3.  **Start Services with Docker:**
    Use Docker Compose to launch the CouchDB instance and any other required services:

    ```bash
    docker-compose up -d
    ```

4.  **Install Dependencies:**

    ```bash
    npm install
    ```

    (or `yarn install`)

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 📚 Documentation & Guides

For detailed information on the project's architecture, setup, and core systems, please refer to the documents below:

### Getting Started

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes with Docker
- **[ADMIN_DASHBOARD_GUIDE.md](./ADMIN_DASHBOARD_GUIDE.md)** - Admin dashboard usage guide with examples

### Admin Dashboard Features

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Architecture overview and implementation details
- **[docs/COUCHDB_INTEGRATION.md](./docs/COUCHDB_INTEGRATION.md)** - Complete CouchDB integration guide with API examples

### Project Setup & Architecture

- **[Setup Guide](./docs/setup.md)** - How to get the development environment running.
- **[Architecture Overview](./docs/architecture.md)** - Deep dive into the structure, data flow (GraphQL/tRPC), and service interaction.
- **[Authentication System](./docs/auth-system.md)** - Details on user roles, session management, and security protocols.
- **[CouchDB Setup](./docs/couchdb/docker-run.md)** - Docker commands and setup instructions

---

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for guidelines on how to submit pull requests and report issues.

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
