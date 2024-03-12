import { Group, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { IRequestPostLanguage, IRequestPutLanguage } from '../../api/types';

interface IProperties {
  form: UseFormReturnType<IRequestPostLanguage> | UseFormReturnType<IRequestPutLanguage>;
}

/**
 * Форма добавления и редактирования языка
 * @param root0 пропсы
 * @param root0.form состояние формы
 * @returns JSX Element
 */
export function FormLanguage({ form }: Readonly<IProperties>) {
  /**
   * Решение как принимать два интерфейса
   * подробнее уже описал: /src/entities/places/ui/forms/form-place.tsx
   */
  const { getInputProps } = form as UseFormReturnType<IRequestPostLanguage>;

  return (
    <Group mt="md">
      <TextInput
        withAsterisk
        label="Язык"
        placeholder="Название"
        {...getInputProps('name')}
        miw={300}
      />

      <TextInput
        withAsterisk
        label="Slug"
        placeholder="ISO 639-1"
        maxLength={2}
        {...getInputProps('slug')}
      />
    </Group>
  );
}
