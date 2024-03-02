import { Box, Loader, LoadingOverlay } from '@mantine/core';
import { ReactNode } from 'react';

interface IProperties {
  isPending: boolean;
  children: ReactNode;
  size?: number;
}

/**
 * Кастомные оверлей загрузчик
 * @param root0 пропсы
 * @param root0.isPending индикатор загрузки
 * @param root0.children любой компонент
 * @param root0.size размер спиннера (30)
 * @returns JSX Element
 */
export function CustomLoadingOverlay({ isPending, children, size = 30 }: IProperties) {
  if (!children) return;
  return (
    <Box pos="relative">
      <LoadingOverlay visible={isPending} loaderProps={{ children: <Loader size={size} /> }} />
      {children}
    </Box>
  );
}
