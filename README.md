## 🚀 LMS Project

This is the official repository for the **Learner Management System (LMS)**, a modern, full-stack application built for efficient content delivery and student progress tracking.

---

## ✨ Features

- **Modular Course Management:** Easily create, organize, and manage courses, modules, and lessons.
- **Progress Tracking:** Comprehensive student progress monitoring and analytics.
- **User Roles:** Separate roles for **Administrators**, **Instructors**, and **Students**.
- **Scalable Architecture:** Designed for performance and easy scaling using modern technologies.

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
├── node_modules/
├── package.json
├── **app/** (Next.js App Router for frontend components and pages)
├── **src/** (Core logic, hooks, utilities)
├── **database/** (CouchDB configuration and initial data scripts)
├── **api/**
│ ├── **graphql/** (Schema definitions, resolvers, etc.)
│ ├── **rest/** (Rest API route handlers)
│ └── **trpc/** (tRPC router and context setup)
├── **docker-compose.yml**
├── **README.md** (This file)
└── **docs/**
├── **setup.md**
├── **architecture.md**
└── **auth-system.md**
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

- **Project Setup:** How to get the development environment running.
  - [Setup Guide](./docs/setup.md)
- **Project Architecture:** Deep dive into the structure, data flow (GraphQL/tRPC), and service interaction.
  - [Architecture Overview](./docs/architecture.md)
- **Login and Authentication System:** Details on user roles, session management, and security protocols.
  - [Authentication System](./docs/auth-system.md)

---

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for guidelines on how to submit pull requests and report issues.

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
