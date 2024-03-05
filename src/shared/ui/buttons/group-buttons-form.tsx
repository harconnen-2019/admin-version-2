import { Button, Group, Space } from '@mantine/core';
import { ReactNode } from 'react';
import { ButtonBack } from './button-back';

/**
 * Кнопки для формы с кнопкой возврата с формы - назад
 * @param root0 пропсы
 * @param root0.disabled выключение кнопки
 * @param root0.children текст кнопки (если не задан, то: Отправить форму)
 * @returns компонент кнопки белой
 */
export function GroupButtonForm({
  disabled,
  children = 'Отправить форму',
}: Readonly<{ disabled: boolean; children?: ReactNode }>) {
  return (
    <>
      <Space h={50} />
      <Group>
        <Button type="submit" disabled={disabled}>
          {children}
        </Button>
        <ButtonBack />
      </Group>
    </>
  );
}
