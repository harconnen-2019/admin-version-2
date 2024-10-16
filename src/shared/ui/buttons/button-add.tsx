import { Button, Space } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProperties {
  children: ReactNode;
  link: string;
}

/**
 * Кнопка добавления с иконкой (плюс)
 * @param root0 пропсы
 * @param root0.children название кнопки
 * @param root0.link ссылка
 * @returns компонент зеленой кнопки со ссылкой
 */
export function ButtonAdd({ children, link }: Readonly<IProperties>) {
  if (!children) return;
  return (
    <>
      <Link to={link}>
        <Button color="green" leftSection={<IconCirclePlus size={18} />}>
          {children}
        </Button>
      </Link>
      <Space h="xl" />
    </>
  );
}
