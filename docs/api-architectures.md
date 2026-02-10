# API Architecture Research & Use Cases

This document explores the different API protocols implemented in this project and their specific roles in a scalable enterprise system.

## 1. tRPC (The Internal Engine)

- **Use Case:** Best for internal communication within a TypeScript Monorepo (Next.js).
- **Why we use it:** It provides "End-to-End Type Safety." If the backend changes a field name, the frontend breaks immediately during development.
- **Pros:** Zero documentation needed (the code is the doc), high developer velocity.
- **Cons:** Only works with TypeScript-to-TypeScript environments.

## 2. REST API (The Universal Door)

- **Use Case:** Public APIs, Third-party integrations, and Mobile applications.
- **Why we use it:** Every language (Python, Java, Swift) understands REST. It is the "lingua franca" of the internet.
- **Pros:** Excellent caching (standard HTTP headers), widely understood, stateless.
- **Cons:** Over-fetching (getting more data than you need) or Under-fetching (needing 3 calls for one page).

## 3. GraphQL (The Flexible Query)

- **Use Case:** Complex data relationships and frontend-driven dashboards.
- **Why we use it:** Allows the frontend to ask for _exactly_ what it needs and nothing more.
- **Pros:** One single endpoint, self-documenting schema (Introspection).
- **Cons:** Complex setup, harder to cache than REST.

## 4. Next.js Server Actions (Internal Form Handling)

- **Research Question:** _Do Server Actions work for JWT authentication from an external mobile app?_
- **The Answer:** **No.** Server Actions are tightly coupled to the Next.js framework. They use internal "Action IDs" and rely heavily on cookies and browser-specific headers. An external Mobile App (iOS/Android) cannot easily "call" a Server Action like a standard POST endpoint.
- **Conclusion:** For external apps, a dedicated REST or GraphQL endpoint with JWT passed in the `Authorization` header is required.

## The Senior Goal: Declarative API Generation

In this project, we move toward a system where we **declare** our model (e.g., `User` or `Lesson`), and the system **automatically** generates the tRPC procedures, REST routes, and GraphQL schemas. This eliminates technical debt and ensures consistency.
