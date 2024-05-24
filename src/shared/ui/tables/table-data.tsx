import { Skeleton, Table } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

import { DEBUG } from '@/shared/api';

import { GenericError } from '@/shared/lib/fetch';
import { ErrorHandler } from '../alert/error-handler/error.ui';

interface IProperties {
  isLoading: boolean;
  tableHead?: { [key: string]: string | number }[];
  children: ReactNode;
  error: GenericError<never> | null | undefined;
  // если пустая таблица выводится предупреждение
  empty: boolean | undefined;
}

/**
 * Выводит списочные данные в таблице
 * Если данные не получены выводит спиннер по количеству заголовков
 * Таблица усложнена, чтобы ошибки и т.д. выводились внутри таблицы а не вместо нее
 * @param properties { children, isLoading, tableHead, empty, error }
 * @returns таблицу, спиннер, предложение заполнить, ошибку
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

  const error_ = error ? (
    <Table.Tr>
      <Table.Td colSpan={tableHead?.length} p={0}>
        <ErrorHandler error={error} />
      </Table.Td>
    </Table.Tr>
  ) : undefined;

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

  /**
   * Помощник, чтобы число заголовков совпадало с числом ячеек в данных
   * Работает только на локальном компьютере
   * Colspan не отслеживает, но все равно помогает хорошо
   */
  useEffect(() => {
    /**
     * Вспомогательная функция, для вставки элемента
     * @param referenceNode элемент
     * @param newNode элемент
     */
    function insertAfter(referenceNode: HTMLTableElement | null, newNode: Node) {
      referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
    }
    if (DEBUG) {
      setTimeout(() => {
        const td = document.querySelectorAll('tbody > tr:first-child > .mantine-Table-td');

        if (tableHead?.length !== td.length && !document.querySelector('[data-mute-note]')) {
          const table = document.querySelector('table');

          const element = document.createElement('span');
          element.dataset.muteNote = '';
          element.setAttribute('style', 'color: red');
          element.innerHTML = '😱 Число заголовков и столбцов данных не совпадают';

          insertAfter(table, element);
        }
      }, 1000);
    }
  }, [tableHead]);

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
