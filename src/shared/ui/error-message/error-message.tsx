import { Alert, List } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { Log } from '@/shared/lib';

const icon = <IconInfoCircle />;

interface ErrorMessageProperties {
  children: ReactNode;
  error: Error | null | undefined;
}

/**
 * Вывод ошибки на экран
 * @param root0 пропсы
 * @param root0.children 1 строка текста ошибки
 * @param root0.error текст ошибки
 * @returns JSX Element
 */
export function ErrorMessage({ children, error, ...properties }: Readonly<ErrorMessageProperties>) {
  if (!children || error === undefined) {
    Log.warn('Log: Ошибка пришла в неправильном формате ', { error });
    return;
  }

  return (
    <Alert
      variant="light"
      radius={9}
      color="red"
      title="Ошибка"
      icon={icon}
      mt="md"
      {...properties}
    >
      <List>
        <List.Item>{children}</List.Item>
        <List.Item>{error?.message}</List.Item>
      </List>
    </Alert>
  );
}
