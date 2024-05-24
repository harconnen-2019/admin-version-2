import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { languageInitial, languageQueries, languageTypes } from '@/entities/thesaurus/language';
import { withSuspense } from '@/shared/lib/react';
import { ErrorHandler, GroupButtonForm, SpinnerData } from '@/shared/ui';

import { FormLanguage } from './form-language.ui';

/**
 * Редактирование  языка
 * @returns форма редактирования
 */
function FormUpdate() {
  const { langId } = useParams() as languageTypes.LanguageParameters;

  const {
    mutate: updateLanguage,
    isPending,
    isError,
    error,
  } = languageQueries.useUpdateMutation(langId);

  const { data: language, status } = useSuspenseQuery(
    languageQueries.serviceById.queryOptions(langId),
  );

  /**
   * Инициализация состояния формы редактирования
   * Указание полей для валидации
   */
  const form = useForm<languageTypes.UpdateLanguage>({
    initialValues: languageInitial.languageInitialUpdate(langId),
    validate: languageInitial.languageFormValidate,
  });

  /**
   * Получаем данные из api и заменяем ими инициализированные данные в форме
   * Линтер ругается, хочет подключить в массив "form", но она там не нужна
   */
  useEffect(() => {
    status === 'success' &&
      language &&
      form.setValues(languageInitial.languageLoadFromApi(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return (
    <form onSubmit={form.onSubmit((values) => updateLanguage({ language: values }))}>
      <Text c="grape" size="xl" fw={700} mt="md" mb="xl">
        {form.values.name}
      </Text>
      <FormLanguage form={form} />
      {
        // Ошибка отправки формы
        isError && <ErrorHandler error={error} />
      }
      <GroupButtonForm disabled={isPending} />
    </form>
  );
}

const SuspensedForm = withSuspense(FormUpdate, {
  fallback: <SpinnerData />,
});

export const FormLanguageUpdate = withErrorBoundary(SuspensedForm, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} buttonBack />,
});
