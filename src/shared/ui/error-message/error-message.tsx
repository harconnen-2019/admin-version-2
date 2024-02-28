import { Alert, List, Space } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { Log } from '@/shared/lib';
import { ButtonBack } from '../buttons/button-back';

interface ErrorMessageProperties {
  children: ReactNode;
  error: Error | null | undefined;
  buttonBack?: boolean;
}

/**
 * Вывод ошибки на экран
 * @param root0 пропсы
 * @param root0.children 1 строка текста ошибки
 * @param root0.error текст ошибки
 * @param root0.buttonBack кнопка назад
 * @returns JSX Element
 */
export function ErrorMessage({
  children,
  error,
  buttonBack = false,
  ...properties
}: Readonly<ErrorMessageProperties>) {
  if (!children || error === undefined) {
    Log.warn('Log: Ошибка пришла в неправильном формате ', { error });
    return;
  }

  return (
    <>
      <Space h={50} />
      <Alert
        variant="light"
        radius={9}
        color="red"
        title="Ошибка"
        icon={<IconInfoCircle />}
        mt="md"
        {...properties}
      >
        <List>
          <List.Item>{children}</List.Item>
          <List.Item>{error?.message}</List.Item>
        </List>
      </Alert>
      {buttonBack && (
        <>
          <Space h={50} />
          <ButtonBack />
        </>
      )}
    </>
  );
}
