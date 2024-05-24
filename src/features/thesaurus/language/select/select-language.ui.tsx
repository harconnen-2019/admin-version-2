import { Loader, NativeSelect } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';

import { languageQueries } from '@/entities/thesaurus/language';
import { withSuspense } from '@/shared/lib/react';
import { ErrorHandler } from '@/shared/ui';
import { withErrorBoundary } from 'react-error-boundary';

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
function SelectLanguages_({ getInputProps }: Readonly<IProperties>) {
  const { data: languages } = useSuspenseQuery(languageQueries.serviceList.queryOptions());

  return (
    <NativeSelect withAsterisk label="Язык" {...getInputProps} mt="md" w={300}>
      <option disabled value="0">
        Выбрать...
      </option>
      {languages.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </NativeSelect>
  );
}

const Suspensed = withSuspense(SelectLanguages_, {
  fallback: <Loader size="sm" />,
});

export const SelectLanguages = withErrorBoundary(Suspensed, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
