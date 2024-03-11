import { Center, Container } from '@mantine/core';

import { GenericError } from '@/shared/lib/fetch';
import { ErrorHandler } from '../error-handler/error.ui';

type FullPageErrorProperties = {
  error: GenericError<never>;
};

/**
 * Ошибка на всю страницу
 * @param properties пропсы
 * @returns JSX Element
 */
export function FullPageError(properties: Readonly<FullPageErrorProperties>) {
  const { error } = properties;

  return (
    <Center h={'100Vh'}>
      <Container>
        <ErrorHandler error={error} />
      </Container>
    </Center>
  );
}
