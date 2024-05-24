import { useSuspenseQuery } from '@tanstack/react-query';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';

import { Loader, NativeSelect } from '@mantine/core';

import { typeFromPlaceQueries } from '@/entities/type-from-place';
import { withSuspense } from '@/shared/lib/react';
import { ErrorHandler } from '@/shared/ui';
import { withErrorBoundary } from 'react-error-boundary';

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
function SelectTypeFromPlace_({ getInputProps }: Readonly<IProperties>) {
  const { data: typeList } = useSuspenseQuery(typeFromPlaceQueries.serviceList.queryOptions());

  return (
    <NativeSelect withAsterisk label="Тип витрины" {...getInputProps} mt="md" w={300}>
      <option disabled value="0">
        Выбрать...
      </option>
      {typeList.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </NativeSelect>
  );
}

const Suspensed = withSuspense(SelectTypeFromPlace_, {
  fallback: <Loader size="sm" />,
});

export const SelectTypeFromPlace = withErrorBoundary(Suspensed, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
