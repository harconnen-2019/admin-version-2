import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface IProperties {
  to: string;
  children: string;
}

/**
 * Ссылка с готовым стилем (надстройка над Link)
 * @param root0 пропсы
 * @param root0.to ссылка
 * @param root0.children текст внутри ссылки
 * @returns JSX Element
 */
export function LinkAnchor({ to, children }: Readonly<IProperties>) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Text c="var(--mantine-primary-color-light-color)">{children}</Text>
    </Link>
  );
}
