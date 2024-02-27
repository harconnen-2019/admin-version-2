import { Button, Group, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

/**
 * Кнопка возврата с формы - назад
 * @param root0 пропсы
 * @param root0.disabled выключение кнопки
 * @returns компонент кнопки белой
 */
export function GroupButtonForm({ disabled }: Readonly<{ disabled: boolean }>) {
  const navigate = useNavigate();
  return (
    <>
      <Space h={50} />
      <Group>
        <Button type="submit" variant="light" disabled={disabled}>
          Отправить форму
        </Button>
        <Button type="button" variant="default" onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      </Group>
    </>
  );
}
