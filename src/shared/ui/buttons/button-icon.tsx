import { ActionIcon } from '@mantine/core';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProperties {
  link: string;
  children: ReactNode;
}

/**
 * Кнопка с иконкой
 * @param root0 пропсы
 * @param root0.link ссылка для перехода
 * @param root0.children иконка для кнопки
 * @returns компонент синей кнопки XL со ссылкой
 */
export function ButtonIcon({ link, children }: Readonly<IProperties>) {
  return (
    <Link to={link}>
      <ActionIcon variant="light" color="blue" size="xl">
        {children}
      </ActionIcon>
    </Link>
  );
}
