import { render, screen } from 'test-utils';
import { describe, it } from 'vitest';

import { Table } from '@mantine/core';
import { TableData } from '../table-data';

const head = [
  { id: 1, name: 'ID', w: 50 },
  { id: 2, name: 'Состояние', w: 200 },
  { id: 3, name: 'Витрина', w: 'auto' },
  { id: 4, name: 'Создана', w: 170 },
  { id: 5, name: 'Изменена', w: 170 },
  { id: 6, name: ' ', w: 100 },
  { id: 7, name: ' ', w: 50 },
];

describe('Таблица с данными на всех страницах', () => {
  it('Fetch posts', () => {
    render(
      <TableData isLoading={true} error={undefined} tableHead={head} empty={false}>
        {1 > 3 && (
          <Table.Tr>
            <Table.Td>1</Table.Td>
          </Table.Tr>
        )}
      </TableData>,
    );
    screen.debug();
  });

  it('Показ загрузчика, при ожидании данных', () => {});
  it('Количество столбцов загрузчиков равно количеству заголовков', () => {});
  it('Сообщение, что таблица пустая', () => {});
  it('Сообщение об ошибке', () => {});
  it('Вывод данных', () => {});
  it('Не пришли заголовки таблицы, не должны выводится', () => {});
  it('Предупреждение, что количество заголовков не совпадает с количеством столбцов', () => {});
});
