import { pathKeys } from '@/shared/lib/react-router';
import { ButtonAdd, TitlePage } from '@/shared/ui';
import { TableLanguages } from '@/widgets/thesaurus/language';

/**
 * Страница со списком языков в табличном варианте
 * @returns страница
 */
export function LanguageListPage() {
  return (
    <>
      <TitlePage>Языки</TitlePage>
      <ButtonAdd link={pathKeys.languages.create()}>Новый язык</ButtonAdd>
      <TableLanguages />
    </>
  );
}
