import { render, screen } from '@test-utils';
import { describe, it } from 'vitest';

import { Table } from '@mantine/core';
import { TableData } from '../table-data';

const head = [
  { id: 1, name: 'ID', w: 50 },
  { id: 2, name: 'Создана', w: 170 },
  { id: 3, name: 'Изменена', w: 170 },
  { id: 4, name: ' ', w: 50 },
];

const rows = [1, 2, 3, 4];

describe('Таблица с данными на всех страницах', () => {
  it('Показ загрузчика, при ожидании данных, количество по три в каждом столбце', () => {
    const { container } = render(
      <TableData isLoading={true} error={undefined} tableHead={head} empty={undefined}>
        <Table.Tr>
          <Table.Td>1</Table.Td>
        </Table.Tr>
      </TableData>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const result = container.querySelectorAll('.mantine-Skeleton-root');

    expect(result).toHaveLength(head.length * 3);
  });

  it('Сообщение, что таблица пустая, "colSpan" равно числу заголовков', () => {
    render(
      <TableData isLoading={false} error={undefined} tableHead={head} empty={true}>
        <Table.Tr>
          {rows.map((element) => (
            <Table.Td key={element}>{element}</Table.Td>
          ))}
        </Table.Tr>
      </TableData>,
    );

    const result = screen.getByRole('cell', {
      name: /🤔 данных еще нет, самое время начать заполнять таблицу/i,
    });

    expect(result).toBeInTheDocument();
    expect(result).toHaveAttribute('colSpan', '4');
  });

  it('Сообщение об ошибке, "colSpan" равно числу заголовков', () => {
    const error = new Error('Тестовая ошибка');

    render(
      <TableData isLoading={false} error={error} tableHead={head} empty={undefined}>
        <Table.Tr>
          <Table.Td>1</Table.Td>
        </Table.Tr>
      </TableData>,
    );

    const tableTd = screen.getByRole('cell', {
      name: /ошибка/i,
    });
    const result = screen.getByText(error.message);

    expect(result).toBeInTheDocument();
    expect(tableTd).toHaveAttribute('colSpan', '4');
  });

  it('Вывод данных "children" внутри таблицы', () => {
    render(
      <TableData isLoading={false} error={undefined} tableHead={head} empty={undefined}>
        <Table.Tr>
          <Table.Td colSpan={4}>Вывод данных</Table.Td>
        </Table.Tr>
      </TableData>,
    );

    const result = screen.getByText(/Вывод данных/);

    expect(result).toBeInTheDocument();
  });

  it('Не пришли заголовки таблицы, не должны выводится, ошибки быть не должно', () => {
    render(
      <TableData isLoading={false} error={undefined} tableHead={undefined} empty={undefined}>
        <Table.Tr>
          <Table.Td colSpan={4}>Вывод данных</Table.Td>
        </Table.Tr>
      </TableData>,
    );

    const table = screen.getByRole('table');
    const result = screen.queryByText(/ID/);
    const text = screen.getByText(/Вывод данных/);

    expect(table).toBeInTheDocument();
    expect(result).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
