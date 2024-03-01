import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    root: '.',
    setupFiles: ['./test-utils/setup.ts'],
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{vscode,git,cache,output,temp}/**',
      '**/{rollup,webpack,vite,vitest,jest,ava,babel,nyc,build}.config.*',
      '**/{assets, mocks}/**',
      './src/**/index.ts',
    ],
    coverage: {
      exclude: [
        'public/**',
        '**/{mocks, assets}/**',
        '**/index.ts',
        '**/types.ts',
        '.eslintrc.cjs',
        'postcss.config.cjs',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: [
      { find: '@test-utils', replacement: resolve('.', './test-utils') },
      { find: '@', replacement: resolve('.', './src') },
    ],
  },
});
