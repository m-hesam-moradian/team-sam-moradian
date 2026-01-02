# Problem Log - 2025-12-30

## 1. Bash Syntax Error with Route Groups

- **Problem**: Running `mkdir -p src/app/(admin)` failed because Bash treats `()` as special characters.
- **Solution**: Wrapped the directory path in double quotes: `mkdir -p "src/app/(admin)"`.

## 2. Dependency Desync in Docker

- **Problem**: Installed `tailwind-merge` but Docker container threw "Module not found".
- **Solution**: Performed `docker compose down` and then `docker compose up --build` to force a re-installation of node_modules inside the container layer.
