import { Checkbox, Table } from '@mantine/core';

import { PATH } from '@/pages/path';
import { getDate } from '@/shared/lib';
import { ButtonDell, LinkAnchor, TableData } from '@/shared/ui';

import { IPlace } from '../../api/types';
import { useSelectPlace } from '../../hooks/use-places-query';

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
  const { mutate } = useSelectPlace();

  /**
   * Формируем строки таблицы
   */
  const rows = data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox
          ml={'sm'}
          color="grape"
          size="md"
          aria-label="Select row"
          checked={placeId === element.id}
          onChange={(event) => {
            event.currentTarget.checked && mutate(element.id);
          }}
        />
      </Table.Td>
      <Table.Td>
        <LinkAnchor select={placeId === element.id} to={PATH.places.edit(element.id)}>
          {element.name}
        </LinkAnchor>
      </Table.Td>
      <Table.Td>{getDate(element.created)}</Table.Td>
      <Table.Td>{getDate(element.modified)}</Table.Td>
      <Table.Td align="right">
        <ButtonDell
          callback={() => remove(element.id, element.name)}
          disabled={placeId === element.id}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <TableData
      isLoading={status === 'pending'}
      error={error}
      tableHead={[
        { id: 1, name: 'Выбор', w: 100 },
        { id: 2, name: 'Витрина', w: 'auto' },
        { id: 3, name: 'Создана', w: 170 },
        { id: 4, name: 'Изменена', w: 170 },
        { id: 5, name: ' ', w: 50 },
      ]}
      empty={(status === 'success') === (data.length === 0)}
    >
      {status === 'success' && data.length > 0 && rows}
    </TableData>
  );
}
