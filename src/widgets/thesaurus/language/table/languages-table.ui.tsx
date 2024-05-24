import { useSuspenseQuery } from '@tanstack/react-query';
import { withErrorBoundary } from 'react-error-boundary';

import { Badge, Table } from '@mantine/core';

import { languageQueries } from '@/entities/thesaurus/language';
import { getDate } from '@/shared/lib';
import { withSuspense } from '@/shared/lib/react';
import { pathKeys } from '@/shared/lib/react-router';
import { ButtonDell, ErrorHandler, LinkAnchor, SpinnerData, TableData } from '@/shared/ui';

/**
 * Таблица с данными языков
 * @returns JSX Element
 */
function TableLanguages_() {
  const {
    data: languages,
    status,
    error,
  } = useSuspenseQuery(languageQueries.serviceList.queryOptions());
  const removeLanguage = languageQueries.useRemoveMutation();

  /**
   * Формируем строки таблицы
   */
  const rows = languages.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Badge variant="default">{element.slug}</Badge>
      </Table.Td>
      <Table.Td>
        <LinkAnchor to={pathKeys.languages.edit({ id: String(element.id) })}>
          {element.name}
        </LinkAnchor>
      </Table.Td>
      <Table.Td>{getDate(element.created)}</Table.Td>
      <Table.Td>{getDate(element.modified)}</Table.Td>
      <Table.Td align="right">
        <ButtonDell callback={() => removeLanguage(element.id, element.name)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <TableData
      isLoading={status !== 'success'}
      error={error}
      tableHead={[
        { id: 1, name: 'Slug', w: 50 },
        { id: 2, name: 'Язык', w: 'auto' },
        { id: 3, name: 'Создан', w: 170 },
        { id: 4, name: 'Изменен', w: 170 },
        { id: 5, name: ' ', w: 50 },
      ]}
      empty={(status === 'success') === (languages.length === 0)}
    >
      {status === 'success' && languages.length > 0 && rows}
    </TableData>
  );
}

const Suspensed = withSuspense(TableLanguages_, {
  fallback: <SpinnerData />,
});

export const TableLanguages = withErrorBoundary(Suspensed, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} buttonBack />,
});
