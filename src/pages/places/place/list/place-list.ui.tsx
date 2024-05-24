import { pathKeys } from '@/shared/lib/react-router';
import { ButtonAdd, TitlePage } from '@/shared/ui';
import { TablePlaces } from '@/widgets/place';

/**
 * Страница со списком витрин в табличном варианте
 * @returns страница
 */
export function PlaceListPage() {
  return (
    <>
      <TitlePage>Витрины</TitlePage>
      <ButtonAdd link={pathKeys.places.create()}>Новая витрина</ButtonAdd>
      <TablePlaces />
    </>
  );
}
