import { useParams } from 'react-router-dom';

import { useForm } from '@mantine/form';

import {
  FormLanguage,
  languageFormValidate,
  languageInitialPut,
  languageLoadFromApi,
  languagesType,
  useGetLanguage,
  useUpdateLanguage,
} from '@/entities/thesaurus/languages';
import { CustomLoadingOverlay, ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';
import { useEffect } from 'react';

/**
 * Страница редактирования языка
 * @returns страница
 */
export default function LanguageEditPage() {
  const { languageId } = useParams();
  const updateLanguage = useUpdateLanguage();

  const { data, error, status } = useGetLanguage(languageId!);
  const language = data?.thesaurus_language ?? undefined;

  /**
   * Инициализация состояния формы редактирования
   * Указание полей для валидации
   */
  const form = useForm<languagesType.IRequestPutLanguage>({
    initialValues: languageInitialPut(languageId!),
    validate: languageFormValidate,
  });

  /**
   * Получаем данные из api и заменяем ими инициализированные данные в форме
   * Линтер ругается, хочет подключить в массив "form", но она там не нужна
   */
  useEffect(() => {
    status === 'success' && language && form.setValues(languageLoadFromApi(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <CustomLoadingOverlay isPending={status === 'pending'}>
      <TitlePage subtitle={form.values.name} divider>
        Редактировать язык
      </TitlePage>

      {
        // Ошибка загрузки данных для формы
        error ? (
          <ErrorMessage error={error} buttonBack>
            Редактирование невозможно
          </ErrorMessage>
        ) : (
          <form onSubmit={form.onSubmit((values) => updateLanguage.mutate(values))}>
            <FormLanguage form={form} />
            {
              // Ошибка отправки формы
              updateLanguage.isError && (
                <ErrorMessage error={updateLanguage.error}>Форма не отправлена</ErrorMessage>
              )
            }
            <GroupButtonForm disabled={updateLanguage.isPending} />
          </form>
        )
      }
    </CustomLoadingOverlay>
  );
}
