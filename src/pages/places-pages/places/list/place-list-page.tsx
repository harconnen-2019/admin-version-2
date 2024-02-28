import { Space } from '@mantine/core';

import { TablePlace, usePlaceList, useRemovePlace } from '@/entities/places';
import { PATH_PAGE } from '@/pages/path';
import { useAuth } from '@/shared/hooks';
import { ButtonAdd, TitlePage } from '@/shared/ui';

/**
 * Страница со списком витрин в табличном варианте
 * @returns таблица с витринами
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
      <Space h="xl" />
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
