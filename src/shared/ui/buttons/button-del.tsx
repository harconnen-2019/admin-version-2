import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface IProperties {
  callback: () => void;
}

/**
 * Кнопка удаления с иконкой (корзина)
 * @param root0 пропсы
 * @param root0.callback метод при нажатии на кнопку
 * @returns компонент красной кнопки с иконкой и ссылкой
 */
export function ButtonDell({ callback }: Readonly<IProperties>) {
  return (
    <ActionIcon variant="light" color="red" onClick={callback} size="md">
      <IconTrash size="1rem" />
    </ActionIcon>
  );
}
