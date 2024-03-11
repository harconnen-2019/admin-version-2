import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineUiProvider } from './mantine-provider';
import { QueryClientProvider } from './query-client-provider';
import { BrowserRouter } from './router-provider';

/**
 * Подключенные провайдеры
 * @returns JSX.Element
 */
export function Provider() {
  return (
    <MantineUiProvider>
      <QueryClientProvider>
        <BrowserRouter />
      </QueryClientProvider>
    </MantineUiProvider>
  );
}
