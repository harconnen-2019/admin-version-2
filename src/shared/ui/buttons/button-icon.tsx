import { ActionIcon } from '@mantine/core';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProperties {
  link: string;
  icon: ReactNode;
}

/**
 * Кнопка с иконкой
 * @param root0 пропсы
 * @param root0.link ссылка для перехода
 * @param root0.icon иконка для кнопки
 * @returns компонент синей кнопки XL со ссылкой
 */
export function ButtonIcon({ link, icon }: Readonly<IProperties>) {
  return (
    <Link to={link}>
      <ActionIcon variant="light" color="blue" size="xl">
        {icon}
      </ActionIcon>
    </Link>
  );
}
