import { Box, NativeSelect } from '@mantine/core';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';

import { CustomLoadingOverlay } from '@/shared/ui';

import { useLanguageList } from '../../hooks/use-languages-query';

interface IProperties {
  getInputProps: GetInputPropsReturnType;
}

/**
 * Список языков с выбором
 * Пока идет загрузка показывается CustomLoadingOverlay
 * Первое пустое поле обязательно, особенность библиотеки, без ручного выбора нет значения
 * @param root0 пропсы
 * @param root0.getInputProps поле состояния формы
 * @returns поле select
 */
export function SelectLanguages({ getInputProps }: Readonly<IProperties>) {
  const { data, status, error } = useLanguageList();
  const listLanguages = data?.thesaurus_language_list ?? [];
  listLanguages.sort((a, b) => a.name.localeCompare(b.name));

  if (error)
    return (
      <Box c="red">
        Язык
        <br /> {error.message}
      </Box>
    );

  return (
    <CustomLoadingOverlay isPending={status === 'pending'} size={20}>
      <NativeSelect withAsterisk label="Язык" {...getInputProps} mt="md" w={300}>
        <option disabled value="0">
          Выбрать...
        </option>
        {listLanguages.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </NativeSelect>
    </CustomLoadingOverlay>
  );
}
