/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@test-utils', replacement: resolve('.', './test-utils') },
      { find: '@', replacement: resolve('.', './src') },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-utils/setup.ts',
  },
});
