import { Divider, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface IProperties {
  children: ReactNode;
  subtitle?: string;
  divider?: boolean;
}

/**
 * Заголовок для страницы (с подзаголовком)
 * @param root0 пропсы
 * @param root0.children текст заголовка
 * @param root0.subtitle выделенный текст на второй строке
 * @param root0.divider разделитель
 * @returns компонент заголовка в формате H1
 */
export function TitlePage({ children, subtitle, divider = false }: Readonly<IProperties>) {
  if (!children) return;
  return (
    <>
      <Title order={subtitle ? 2 : 1} my={20} mb="xl">
        {children}
        {subtitle && (
          <Text c="grape" size="2rem" fw={700} mt="md">
            {subtitle}
          </Text>
        )}
      </Title>
      {divider && <Divider my="md" />}
    </>
  );
}
