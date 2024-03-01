import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';

import React from 'react';
import { theme } from '../src/theme';

/**
 * Wrapper для библиотеки
 * @param ui дочерний компонент
 * @returns JSX Element
 */
export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
  });
}
