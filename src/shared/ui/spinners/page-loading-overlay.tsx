import { Box, Loader, LoadingOverlay } from '@mantine/core';
import { ReactNode } from 'react';

interface IProperties {
  isPending: boolean;
  children: ReactNode;
}

/**
 * Кастомные оверлей загрузчик
 * @param root0 пропсы
 * @param root0.isPending индикатор загрузки
 * @param root0.children любой компонент
 * @returns JSX Element
 */
export function PageLoadingOverlay({ isPending, children }: IProperties) {
  if (!children) return;
  return (
    <Box pos="relative">
      <LoadingOverlay visible={isPending} loaderProps={{ children: <Loader size={30} /> }} />
      {children}
    </Box>
  );
}
