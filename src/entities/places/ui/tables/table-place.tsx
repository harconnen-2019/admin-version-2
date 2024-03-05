import { Badge, Table } from '@mantine/core';

import { PATH_PAGE } from '@/pages/path';
import { getDate } from '@/shared/lib';

import { ButtonDell, LinkAnchor, TableData } from '@/shared/ui';
import { IPlace } from '../../api/types';
import { SelectPlaceButton } from '../select/select-place-button';

interface IProperties {
  status: string;
  error: Error | null | undefined;
  data: IPlace[];
  placeId: number | undefined;
  remove: (id: number, name: string) => void;
}

/**
 * Таблица с данными витрины
 * @param root0 пропсы
 * @param root0.data список данных
 * @param root0.error ошибка
 * @param root0.status статус загрузки
 * @param root0.placeId id витрины
 * @param root0.remove метод удаления
 * @returns JSX Element
 */
export function TablePlace({ data, error, status, placeId, remove }: Readonly<IProperties>) {
  /**
   * Формируем строки таблицы
   */
  const rows = data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        {placeId === element.id && (
          <Badge fullWidth variant="light" color="grape">
            Активная
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <LinkAnchor to={PATH_PAGE.place.edit(element.id)}>{element.name}</LinkAnchor>
      </Table.Td>
      <Table.Td>{getDate(element.created)}</Table.Td>
      <Table.Td>{getDate(element.modified)}</Table.Td>
      <Table.Td align="right">
        <SelectPlaceButton placeId={element.id} disabled={placeId === element.id} />
      </Table.Td>
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
        { id: 2, name: 'Состояние', w: 200 },
        { id: 3, name: 'Витрина', w: 'auto' },
        { id: 4, name: 'Создана', w: 170 },
        { id: 5, name: 'Изменена', w: 170 },
        { id: 6, name: ' ', w: 100 },
        { id: 7, name: ' ', w: 50 },
      ]}
      empty={(status === 'success') === (data.length === 0)}
    >
      {status === 'success' && data.length > 0 && rows}
    </TableData>
  );
}
