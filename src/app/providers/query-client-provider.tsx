import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { withSuspense } from '@/shared/lib/react';
import { queryClient } from '@/shared/lib/react-query';
import { FullPageError, SpinnerPage } from '@/shared/ui';
import { withErrorBoundary } from 'react-error-boundary';

type QueryClientProviderProperties = {
  children: ReactNode;
};

/**
 * QueryClient провайдер
 * @param properties параметры
 * @returns JSX Element
 */
function Provider(properties: Readonly<QueryClientProviderProperties>) {
  const { children } = properties;
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanStackQueryClientProvider>
  );
}

/**
 * Спиннер и перехватчик ошибок на самом верхнем уровне
 * Спиннер и ошибка требуют библиотеки Mantine, поэтому подключены до провайдера MantineUiProvider
 */

const SuspensedProvider = withSuspense(Provider, {
  fallback: <SpinnerPage />,
});
export const QueryClientProvider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <FullPageError error={error} />,
});
