import { TableLanguages, useLanguageList, useRemoveLanguage } from '@/entities/thesaurus/languages';
import { PATH } from '@/pages/path';
import { ButtonAdd, TitlePage } from '@/shared/ui';

/**
 * Страница со списком языков в табличном варианте
 * @returns страница
 */
export default function LanguageListPage() {
  const { data, status, error } = useLanguageList();
  const removeLanguage = useRemoveLanguage();

  const listPlaces = data?.thesaurus_language_list ?? [];
  listPlaces.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <TitlePage>Языки</TitlePage>
      <ButtonAdd link={PATH.thesaurus.languages.create}>Новый язык</ButtonAdd>
      <TableLanguages status={status} error={error} data={listPlaces} remove={removeLanguage} />
    </>
  );
}
