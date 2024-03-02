import { useAuth } from '@/entities/auth';
import { TablePlace, usePlaceList, useRemovePlace } from '@/entities/places';
import { PATH_PAGE } from '@/pages/path';
import { ButtonAdd, TitlePage } from '@/shared/ui';

/**
 * Страница со списком витрин в табличном варианте
 * @returns страница
 */
export default function PlaceListPage() {
  const { place } = useAuth();

  const { data, status, error } = usePlaceList();
  const removePlace = useRemovePlace();

  const listPlaces = data?.places_item_list ?? [];

  return (
    <>
      <TitlePage>Витрины</TitlePage>
      <ButtonAdd link={PATH_PAGE.place.create}>Новая витрина</ButtonAdd>
      <TablePlace
        status={status}
        error={error}
        data={listPlaces}
        placeId={place?.id}
        remove={removePlace}
      />
    </>
  );
}
