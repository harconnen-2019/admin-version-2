import { placeQueries } from '@/entities/place';
import { Chip } from '@mantine/core';

interface IProperties {
  placeId: number;
  disabled: boolean;
}

/**
 * !Сейчас не используется (вместо него используется чекбокс)
 * ?При использовании вызывать:
 * <Table.Td>
 *   <ChipPlace placeId={element.id} disabled={placeId === element.id} />
 * </Table.Td>
 *
 * Переключатель с методом назначения витрины "активной"
 * После мутации принудительно обнуляем кэш сессии (там данные изменятся)
 * @param root0 пропс
 * @param root0.placeId ID витрины
 * @param root0.disabled выключение кнопки
 * @returns JSX Element
 */
export function ChipPlace({ placeId, disabled }: Readonly<IProperties>) {
  const { mutate } = placeQueries.useSelectMutation();

  if (disabled) {
    return (
      <Chip color="grape" checked={true} variant="light" style={{ cursor: 'default' }}>
        Активная
      </Chip>
    );
  }

  return (
    <Chip onClick={() => mutate(placeId)} style={{ opacity: 0.5 }} checked={false}>
      выбрать..
    </Chip>
  );
}
