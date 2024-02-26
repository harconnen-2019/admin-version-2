import { ReactNode } from 'react';

import { Skeleton, Table } from '@mantine/core';
import { ErrorMessage } from '../error-message/error-message';

interface IProperties {
  isLoading: boolean;
  tableHead?: { [key: string]: string | number }[];
  children: ReactNode;
  error: Error | null;
  // если пустая таблица выводится предупреждение
  empty: boolean | undefined;
}

/**
 * Выводит списочные данные в таблице
 * Если данные не получены выводит спиннер
 * @param properties { children, isLoading, tableHead, empty }
 * @returns таблицу, спиннер, предложение заполнить
 */
export function TableData(properties: Readonly<IProperties>) {
  const { children, error, isLoading, tableHead, empty } = properties;

  const isDataHead = tableHead && tableHead.length > 0;

  const tableEmpty = (
    <Table.Tr>
      <Table.Td colSpan={tableHead?.length} bg="var(--mantine-color-gray-light)">
        🤔 Данных еще нет, самое время начать заполнять таблицу
      </Table.Td>
    </Table.Tr>
  );

  const error_ = (
    <Table.Tr>
      <Table.Td colSpan={tableHead?.length} p={0}>
        <ErrorMessage error={error}>Данные не загружены</ErrorMessage>
      </Table.Td>
    </Table.Tr>
  );

  const head = isDataHead ? (
    <Table.Thead>
      <Table.Tr>
        {tableHead.map((element) => (
          <Table.Th key={element.id} w={element.w}>
            {element.name}
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  ) : undefined;

  const spinnerTd =
    isLoading &&
    isDataHead &&
    tableHead.map((element) => (
      <Table.Td key={element.id} py="xl">
        <Skeleton height={8} radius="xl" />
      </Table.Td>
    ));

  const spinner = isLoading && isDataHead && (
    <>
      <Table.Tr>{spinnerTd}</Table.Tr>
      <Table.Tr>{spinnerTd}</Table.Tr>
      <Table.Tr>{spinnerTd}</Table.Tr>
    </>
  );

  return (
    <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover>
      {head}
      <Table.Tbody>
        {isLoading && spinner}
        {empty ? tableEmpty : children}
        {error && error_}
      </Table.Tbody>
    </Table>
  );
}
