import { UseSuspenseQueryResult, useSuspenseQueries } from '@tanstack/react-query';
import { withErrorBoundary } from 'react-error-boundary';

import { Checkbox, Table } from '@mantine/core';

import { placeQueries, placeTypes } from '@/entities/place';
import { sessionQueries, sessionTypes } from '@/entities/session';
import { getDate } from '@/shared/lib';
import { withSuspense } from '@/shared/lib/react';
import { pathKeys } from '@/shared/lib/react-router';
import {
  ButtonDell,
  CustomLoadingOverlay,
  ErrorHandler,
  LinkAnchor,
  SpinnerData,
  TableData,
} from '@/shared/ui';

/**
 * Таблица с данными витрины
 * @returns JSX Element
 */
function TablePlaces_() {
  const [session, places]: [
    session: UseSuspenseQueryResult<sessionTypes.Session>,
    places: UseSuspenseQueryResult<placeTypes.PlaceList>,
  ] = useSuspenseQueries({
    queries: [
      sessionQueries.sessionService.queryOptions(),
      placeQueries.serviceList.queryOptions(),
    ],
  });
  const remove = placeQueries.useRemoveMutation();

  const { mutate: select, isPending } = placeQueries.useSelectMutation();

  /**
   * Формируем строки таблицы
   */
  const rows = places.data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox
          ml={'sm'}
          color="grape"
          size="md"
          aria-label="Select row"
          checked={session.data.place?.id === element.id}
          onChange={(event) => {
            event.currentTarget.checked && select(element.id);
          }}
        />
      </Table.Td>
      <Table.Td>
        <LinkAnchor
          select={session.data.place?.id === element.id}
          to={pathKeys.places.edit({ id: String(element.id) })}
        >
          {element.name}
        </LinkAnchor>
      </Table.Td>
      <Table.Td>{getDate(element.created)}</Table.Td>
      <Table.Td>{getDate(element.modified)}</Table.Td>
      <Table.Td align="right">
        <ButtonDell
          callback={() => remove(element.id, element.name)}
          disabled={session.data.place?.id === element.id}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <CustomLoadingOverlay isPending={isPending || session.isFetching}>
      <TableData
        isLoading={places.status !== 'success'}
        error={places.error}
        tableHead={[
          { id: 1, name: 'Выбор', w: 100 },
          { id: 2, name: 'Витрина', w: 'auto' },
          { id: 3, name: 'Создана', w: 170 },
          { id: 4, name: 'Изменена', w: 170 },
          { id: 5, name: ' ', w: 50 },
        ]}
        empty={(places.status === 'success') === (places.data.length === 0)}
      >
        {places.status === 'success' && places.data.length > 0 && rows}
      </TableData>
    </CustomLoadingOverlay>
  );
}

const Suspensed = withSuspense(TablePlaces_, {
  fallback: <SpinnerData />,
});

export const TablePlaces = withErrorBoundary(Suspensed, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} buttonBack />,
});
