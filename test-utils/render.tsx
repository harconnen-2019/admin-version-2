import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';
import { render as testingLibraryRender } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { theme } from '../src/app/providers/theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const uix = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

const uixQuery = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};

/**
 * Wrapper для библиотеки
 * @param ui дочерний компонент
 * @param query подгружаем QueryClientProvider
 * @returns JSX Element
 */
export function render(ui: React.ReactNode, query: boolean = false) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: query ? uixQuery : uix,
  });
}
