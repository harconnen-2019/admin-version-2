import { TitlePage } from '@/shared/ui';
import { FormLanguageUpdate } from '@/widgets/thesaurus/language/forms';

/**
 * Страница редактирования языка
 * @returns страница
 */
export function LanguageEditPage() {
  return (
    <>
      <TitlePage>Редактировать язык</TitlePage>
      <FormLanguageUpdate />
    </>
  );
}
