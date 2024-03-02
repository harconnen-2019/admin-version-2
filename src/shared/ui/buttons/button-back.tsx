import { Button } from '@mantine/core';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Кнопка возврата с формы - назад
 * @param root0 пропсы
 * @param root0.children название кнопки, если нет то: 'Вернуться назад'
 * @returns компонент кнопки белой
 */
export function ButtonBack({ children = 'Вернуться назад' }: Readonly<{ children?: ReactNode }>) {
  const navigate = useNavigate();
  return (
    <Button type="button" variant="default" onClick={() => navigate(-1)}>
      {children}
    </Button>
  );
}
