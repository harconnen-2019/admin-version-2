import { Title } from '@mantine/core';
import { ReactNode } from 'react';

interface IProperties {
  children: ReactNode;
}

/**
 * Заголовок для страницы
 * @param root0 пропсы
 * @param root0.children текст заголовка
 * @returns компонент заголовка в формате H1
 */
export function TitlePage({ children }: Readonly<IProperties>) {
  return (
    <Title order={1} my={20} mb="xl">
      {children}
    </Title>
  );
}
