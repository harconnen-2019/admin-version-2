import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface IProperties {
  to: string;
  children: string;
  select?: boolean;
}

/**
 * Ссылка с готовым стилем (надстройка над Link)
 * @param root0 пропсы
 * @param root0.to ссылка
 * @param root0.children текст внутри ссылки
 * @param root0.select выделение активным цветом (grape)
 * @returns JSX Element
 */
export function LinkAnchor({ to, children, select = false }: Readonly<IProperties>) {
  if (!children) return;

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Text
        c={
          select
            ? 'var(--mantine-color-grape-light-color)'
            : 'var(--mantine-primary-color-light-color)'
        }
      >
        {children}
      </Text>
    </Link>
  );
}
