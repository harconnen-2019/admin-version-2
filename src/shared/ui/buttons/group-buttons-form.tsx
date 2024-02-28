import { Button, Group, Space } from '@mantine/core';
import { ButtonBack } from './button-back';

/**
 * Кнопка возврата с формы - назад
 * @param root0 пропсы
 * @param root0.disabled выключение кнопки
 * @returns компонент кнопки белой
 */
export function GroupButtonForm({ disabled }: Readonly<{ disabled: boolean }>) {
  return (
    <>
      <Space h={50} />
      <Group>
        <Button type="submit" variant="light" disabled={disabled}>
          Отправить форму
        </Button>
        <ButtonBack />
      </Group>
    </>
  );
}
