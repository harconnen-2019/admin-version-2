import { QueryClient } from '@tanstack/react-query';

/**
 * Повторные попытки при ошибке отключены
 * Обновление фокуса окна включено
 * Настройка времени при которых данные считаются свежими 3 минуты
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
    },
  },
});
