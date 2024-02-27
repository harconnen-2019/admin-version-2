import { Space } from '@mantine/core';

import { TrPlace, usePlaceList, useRemovePlace } from '@/entities/places';
import { PATH_PAGE } from '@/pages/path';
import { useAuth } from '@/shared/hooks';
import { ButtonAdd, TableData, TitlePage } from '@/shared/ui';

/**
 * Страница со списком витрин в табличном варианте
 * @returns таблица с витринами
 */
export default function PlaceListPage() {
  const { place } = useAuth();

  const { listPlaces, status, error } = usePlaceList();
  const removePlace = useRemovePlace();

  return (
    <>
      <TitlePage>Витрины</TitlePage>
      <ButtonAdd link={PATH_PAGE.place.create}>Новая витрина</ButtonAdd>
      <Space h="xl" />
      <TableData
        isLoading={status === 'pending'}
        error={error}
        tableHead={[
          { id: 1, name: 'ID', w: 50 },
          { id: 2, name: 'Состояние', w: 200 },
          { id: 3, name: 'Витрина', w: 'auto' },
          { id: 4, name: 'Создана', w: 170 },
          { id: 5, name: 'Изменена', w: 170 },
          { id: 6, name: ' ', w: 100 },
          { id: 7, name: ' ', w: 50 },
        ]}
        empty={(status === 'success') === (listPlaces.length === 0)}
      >
        {status === 'success' &&
          listPlaces.length > 0 &&
          listPlaces.map((element) => (
            <TrPlace key={element.id} placeId={place?.id} element={element} remove={removePlace} />
          ))}
      </TableData>
    </>
  );
}
