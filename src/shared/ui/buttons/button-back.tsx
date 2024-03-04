import { Button } from '@mantine/core';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Кнопка возврата с формы - назад
 * @param root0 пропсы
 * @param root0.children название кнопки, если нет то: 'Вернуться назад'
 * @param root0.step глубина возврата (-1)
 * @returns компонент кнопки белой
 */
export function ButtonBack({
  children = 'Вернуться назад',
  step = -1,
}: Readonly<{ children?: ReactNode; step?: number }>) {
  const navigate = useNavigate();
  return (
    <Button type="button" variant="default" onClick={() => navigate(step)}>
      {children}
    </Button>
  );
}
