import { Badge, Table } from '@mantine/core';

import { PATH } from '@/pages/path';
import { getDate } from '@/shared/lib';
import { ButtonDell, LinkAnchor, TableData } from '@/shared/ui';

import { ILanguage } from '../../api/types';

interface IProperties {
  status: string;
  error: Error | null | undefined;
  data: ILanguage[];
  remove: (id: number, name: string) => void;
}

/**
 * Таблица с данными языков
 * @param root0 пропсы
 * @param root0.data список данных
 * @param root0.error ошибка
 * @param root0.status статус загрузки
 * @param root0.remove метод удаления
 * @returns JSX Element
 */
export function TableLanguages({ data, error, status, remove }: Readonly<IProperties>) {
  /**
   * Формируем строки таблицы
   */
  const rows = data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Badge variant="default">{element.slug}</Badge>
      </Table.Td>
      <Table.Td>
        <LinkAnchor to={PATH.thesaurus.languages.edit(element.id)}>{element.name}</LinkAnchor>
      </Table.Td>
      <Table.Td>{getDate(element.created)}</Table.Td>
      <Table.Td>{getDate(element.modified)}</Table.Td>
      <Table.Td align="right">
        <ButtonDell callback={() => remove(element.id, element.name)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <TableData
      isLoading={status === 'pending'}
      error={error}
      tableHead={[
        { id: 1, name: 'Slug', w: 50 },
        { id: 2, name: 'Язык', w: 'auto' },
        { id: 3, name: 'Создан', w: 170 },
        { id: 4, name: 'Изменен', w: 170 },
        { id: 5, name: ' ', w: 50 },
      ]}
      empty={(status === 'success') === (data.length === 0)}
    >
      {status === 'success' && data.length > 0 && rows}
    </TableData>
  );
}
