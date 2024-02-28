import { Badge, Table } from '@mantine/core';

import { PATH_PAGE } from '@/pages/path';
import { getData } from '@/shared/lib';
import { ButtonDell } from '@/shared/ui';

import { LinkAnchor } from '@/shared/ui/links/link-anchor';
import { IPlace } from '../../api/types';
import { SelectPlaceButton } from '../select/select-place-button';

interface IProperties {
  element: IPlace;
  placeId: number | undefined;
  remove: (id: number, name: string) => void;
}

/**
 * Строка таблицы с данными одной витрины
 * Дату переводим в удобный формат
 * Активная витрина проверяется с ИД витриной из сессии
 * @param root0 пропсы
 * @param root0.element данные одной витрины
 * @param root0.placeId ID активной витрины из сессии
 * @param root0.remove callback метод удаления витрины
 * @returns JSX Element
 */
export function TrPlace({ element, placeId, remove }: Readonly<IProperties>) {
  return (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
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
      <Table.Td>{getData(element.created)}</Table.Td>
      <Table.Td>{getData(element.modified)}</Table.Td>
      <Table.Td align="right">
        <SelectPlaceButton placeId={element.id} disabled={placeId === element.id} />
      </Table.Td>
      <Table.Td align="right">
        <ButtonDell callback={() => remove(element.id, element.name)} />
      </Table.Td>
    </Table.Tr>
  );
}
