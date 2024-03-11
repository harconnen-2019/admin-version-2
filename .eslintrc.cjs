module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      // установить eslint plugin eslint-import-resolver-alias
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        map: [
          ['@/assets', './src/shared/ui/assets'],
          ['@/entities', './src/entities'],
          ['@/pages', './src/pages'],
          ['@/shared', './src/shared'],
          ['@test-utils', './test-utils'],
          ['@/mocks', './src/mocks'],
          // ['@/types', './src/types'],
          // ['@/utils', './src/utils'],
        ],
      },
    },
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
