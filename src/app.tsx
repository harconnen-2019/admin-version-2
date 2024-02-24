import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';

import { Routers } from './pages/routers';
import { theme } from './theme';

const queryClient = new QueryClient();

/**
 * Подключен MantineProvider для кастомизации темы
 * Подключен ModalsProvider для управления всеми модальными окнами
 * @returns JSX Element
 */
function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
