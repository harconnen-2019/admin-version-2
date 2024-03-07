import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface IProperties {
  callback: () => void;
  disabled?: boolean;
}

/**
 * Кнопка удаления с иконкой (корзина)
 * @param root0 пропсы
 * @param root0.callback метод при нажатии на кнопку
 * @param root0.disabled выключение кнопки
 * @returns компонент красной кнопки с иконкой и ссылкой
 */
export function ButtonDell({ callback, disabled = false }: Readonly<IProperties>) {
  return (
    <ActionIcon disabled={disabled} variant="light" color="red" onClick={callback} size="md">
      <IconTrash size="1rem" />
    </ActionIcon>
  );
}
