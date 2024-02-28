import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

/**
 * Кнопка возврата с формы - назад
 * @returns компонент кнопки белой
 */
export function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button type="button" variant="default" onClick={() => navigate(-1)}>
      Вернуться назад
    </Button>
  );
}
