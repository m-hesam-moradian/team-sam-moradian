// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // This makes sure we can use 'describe', 'it', 'expect' without importing them
    globals: true,
    environment: 'node',
    // We can point to a setup file to ensure DB is ready before any test runs
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
