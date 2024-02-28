import { Box, NativeSelect, Skeleton } from '@mantine/core';
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

  if (status === 'pending')
    return <Skeleton height={36} w={300} radius="sm" data-testid="loading" />;

  if (error)
    return (
      <Box c="red">
        Тип витрины
        <br /> {error.message}
      </Box>
    );

  return (
    status === 'success' && (
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
    )
  );
}
