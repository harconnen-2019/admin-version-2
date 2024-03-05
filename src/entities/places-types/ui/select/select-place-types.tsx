import { CustomLoadingOverlay } from '@/shared/ui';
import { Box, NativeSelect } from '@mantine/core';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';
import { usePlaceTypeList } from '../../hooks/use-place-types-query';

interface IProperties {
  getInputProps: GetInputPropsReturnType;
}

/**
 * Список типов витрин с выбором
 * @param root0 пропсы
 * @param root0.getInputProps поле состояния формы
 * @returns поле select
 */
export function SelectPlaceTypes({ getInputProps }: Readonly<IProperties>) {
  const { data, status, error } = usePlaceTypeList();
  const listPlaceTypes = data?.places_type_list ?? [];
  listPlaceTypes.sort((a, b) => a.name.localeCompare(b.name));

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
        {listPlaceTypes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </NativeSelect>
    </CustomLoadingOverlay>
  );
}
