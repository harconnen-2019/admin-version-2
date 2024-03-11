import { useForm } from '@mantine/form';

import { languageInitial, languageQueries, languageTypes } from '@/entities/thesaurus/language';
import { ErrorHandler, GroupButtonForm } from '@/shared/ui';

import { FormLanguage } from './form-language.ui';

/**
 * Добавление нового языка
 * @returns форма добавления
 */
export function FormLanguageCreate() {
  const { mutate: createLanguage, isPending, isError, error } = languageQueries.useCreateMutation();

  /**
   * Инициализация состояния формы добавления
   * Указание полей для валидации
   */
  const form = useForm<languageTypes.CreateLanguage>({
    initialValues: languageInitial.languageInitialCreate(),
    validate: languageInitial.languageFormValidate,
  });
  return (
    <form onSubmit={form.onSubmit((values) => createLanguage({ language: values }))}>
      <FormLanguage form={form} />
      {
        // Ошибка отправки формы
        isError && <ErrorHandler error={error} />
      }
      <GroupButtonForm disabled={isPending} />
    </form>
  );
}
