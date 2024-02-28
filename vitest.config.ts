import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    root: '.',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve('.', './src') }],
  },
});
