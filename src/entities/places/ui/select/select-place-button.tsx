import { Button } from '@mantine/core';
import { QueryClient, useMutation } from '@tanstack/react-query';

import { authApi } from '@/entities/auth';
import { placeApi } from '../../api/places-api';

const queryClient = new QueryClient();

interface IProperties {
  placeId: number;
  disabled: boolean;
}

/**
 * Кнопка с методом назначения витрины "активной"
 * После мутации принудительно обнуляем кэш сессии (там данные изменятся)
 * @param root0 пропс
 * @param root0.placeId ID витрины
 * @param root0.disabled выключение кнопки
 * @returns Кнопка активизации витрины
 */
export function SelectPlaceButton({ placeId, disabled }: Readonly<IProperties>) {
  const { mutate } = useMutation({
    mutationFn: () => placeApi.select(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authApi.key] });
    },
  });

  return (
    <Button onClick={() => mutate()} disabled={disabled} variant="light" size="compact-sm">
      Выбрать
    </Button>
  );
}
