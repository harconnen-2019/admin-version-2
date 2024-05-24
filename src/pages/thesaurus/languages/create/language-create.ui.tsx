import { TitlePage } from '@/shared/ui';
import { FormLanguageCreate } from '@/widgets/thesaurus/language/forms';

/**
 * Страница добавления нового языка
 * @returns страница
 */
export function LanguageCreatePage() {
  return (
    <>
      <TitlePage>Новый язык</TitlePage>
      <FormLanguageCreate />
    </>
  );
}
