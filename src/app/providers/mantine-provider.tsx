import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ReactNode } from 'react';

import { Notifications } from '@mantine/notifications';
import { theme } from './theme';

type MantineProviderProperties = {
  children: ReactNode;
};

/**
 * Подключен MantineProvider для кастомизации темы
 * Подключен ModalsProvider для управления всеми модальными окнами
 * @param properties параметры
 * @returns JSX Element
 */
export function MantineUiProvider(properties: Readonly<MantineProviderProperties>) {
  const { children } = properties;
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
