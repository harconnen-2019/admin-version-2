import { Box, NativeSelect } from '@mantine/core';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';

import { CustomLoadingOverlay } from '@/shared/ui';

import { useTypeFromPlacesList } from '../../hooks/use-types-from-places-query';

interface IProperties {
  getInputProps: GetInputPropsReturnType;
}

/**
 * Список типов витрин с выбором
 * Пока идет загрузка показывается CustomLoadingOverlay
 * Первое пустое поле обязательно, особенность библиотеки, без ручного выбора нет значения
 * @param root0 пропсы
 * @param root0.getInputProps поле состояния формы
 * @returns поле select
 */
export function SelectTypeFromPlaces({ getInputProps }: Readonly<IProperties>) {
  const { data, status, error } = useTypeFromPlacesList();
  const listTypeFromPlaces = data?.places_type_list ?? [];
  listTypeFromPlaces.sort((a, b) => a.name.localeCompare(b.name));

  if (error)
    return (
      <Box c="red">
        Тип витрины
        <br /> {error.message}
      </Box>
    );

  return (
    <CustomLoadingOverlay isPending={status === 'pending'} size={20}>
      <NativeSelect withAsterisk label="Тип витрины" {...getInputProps} mt="md" w={300}>
        <option disabled value="0">
          Выбрать...
        </option>
        {listTypeFromPlaces.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </NativeSelect>
    </CustomLoadingOverlay>
  );
}
