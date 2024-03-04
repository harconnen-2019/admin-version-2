import { Button } from '@mantine/core';

import { useSelectPlace } from '../../hooks/use-places-query';

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
  const { mutate } = useSelectPlace();

  return (
    <Button onClick={() => mutate(placeId)} disabled={disabled} variant="light" size="compact-sm">
      Выбрать
    </Button>
  );
}
