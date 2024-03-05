import { useForm } from '@mantine/form';

import {
  FormLanguage,
  languageFormValidate,
  languageInitialPost,
  languagesType,
  useCreateLanguage,
} from '@/entities/thesaurus/languages';
import { ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';

/**
 * Страница добавления нового языка
 * @returns страница
 */
export default function LanguageCreatePage() {
  const createLanguage = useCreateLanguage();

  /**
   * Инициализация состояния формы добавления
   * Указание полей для валидации
   */
  const form = useForm<languagesType.IRequestPostLanguage>({
    initialValues: languageInitialPost(),
    validate: languageFormValidate,
  });

  return (
    <>
      <TitlePage>Новый язык</TitlePage>
      <form onSubmit={form.onSubmit((values) => createLanguage.mutate(values))}>
        <FormLanguage form={form} />
        {
          // Ошибка отправки формы
          createLanguage.isError && (
            <ErrorMessage error={createLanguage.error}>Форма не отправлена</ErrorMessage>
          )
        }
        <GroupButtonForm disabled={createLanguage.isPending} />
      </form>
    </>
  );
}
