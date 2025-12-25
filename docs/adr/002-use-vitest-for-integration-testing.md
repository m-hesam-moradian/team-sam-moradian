# ADR 002: Use Vitest for Integration Testing

## Status

Accepted

## Context

We needed a way to test the layered architecture (Service -> Repository -> CouchDB) without manually updating package.json for every new test file.

## Decision

We implemented Vitest as the test runner combined with `vite-tsconfig-paths`.

## Consequences

- **Pros**: Tests run automatically based on filename, supports TypeScript aliases (@/), and provides fast parallel execution.
- **Cons**: Requires a running Docker container with CouchDB to pass.
