import { ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface IProperties {
  link: string;
}

/**
 * Кнопка редактирования с иконкой (карандаш) - не применяется
 * @param root0 пропсы
 * @param root0.link ссылка
 * @returns компонент синей кнопки с иконкой и ссылкой
 */
export function ButtonEdit({ link }: Readonly<IProperties>) {
  return (
    <Link to={link}>
      <ActionIcon variant="light" color="blue" size="md">
        <IconEdit size="1rem" />
      </ActionIcon>
    </Link>
  );
}
