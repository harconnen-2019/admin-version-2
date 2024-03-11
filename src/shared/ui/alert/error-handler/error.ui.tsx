import { Log } from '@/shared/lib';
import { GenericError } from '@/shared/lib/fetch';
import { Alert, Space } from '@mantine/core';
import { ButtonBack } from '../..';

type ErrorHandlerProperties = {
  error: GenericError<never>;
  variant?: 'filled' | 'light' | 'outline' | 'transparent';
  buttonBack?: boolean;
};

/**
 * Вывод ошибки, более расширенная версия выводится в консоль
 * @param properties пропсы
 * @returns JSX Element
 */
export function ErrorHandler(properties: Readonly<ErrorHandlerProperties>) {
  const { error, variant = 'filled', buttonBack = false } = properties;

  Log.error(error);

  return (
    <>
      <Space h={50} />
      <Alert variant={variant} color="red" title="Ошибка">
        {error.explanation}
      </Alert>
      {buttonBack && (
        <>
          <Space h={50} />
          <ButtonBack step={-1} />
        </>
      )}
    </>
  );
}
