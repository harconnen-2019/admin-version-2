import { FetchApiRecord } from './fetch.types';

/**
 * Создание нового объекта URL
 * @param config объект
 * @param config.href url
 * @param config.query параметры для url
 * @returns new URL
 */
export function formatUrl(config: { href: string; query: FetchApiRecord }) {
  const { href, query } = config;

  const url = new URL(href);
  const searchParameters = recordToUrlSearchParameters(query);

  url.search = searchParameters.toString();

  return url;
}

/**
 * Создание нового объекта Headers
 * проверяет все аргументы на разрешенные
 * @param headersRecord объект
 * @returns new Headers()
 */
export function formatHeaders(headersRecord: FetchApiRecord): Headers {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  for (const [key, value] of Object.entries(headersRecord)) {
    const cleanValue = clearValue(value);

    if (Array.isArray(cleanValue)) {
      for (const v of cleanValue) headers.append(key, v);
    } else if (cleanValue !== undefined) {
      headers.append(key, cleanValue);
    }
  }

  return headers;
}

/**
 * Создание нового объекта URLSearchParams для URL
 * проверяет все аргументы на разрешенные
 * @param record объект с аргументами
 * @returns new URLSearchParams()
 */
export function recordToUrlSearchParameters(record: FetchApiRecord): URLSearchParams {
  const parameters = new URLSearchParams();

  for (const [key, value] of Object.entries(record)) {
    const cleanValue = clearValue(value);
    if (Array.isArray(cleanValue)) {
      for (const v of cleanValue) parameters.append(key, v);
    } else if (cleanValue !== undefined) {
      parameters.append(key, cleanValue);
    }
  }

  return parameters;
}

/**
 * Преобразует аргументы number | boolean в строку
 * остальное выводит как есть, null преобразует в undefined
 * @param value любой аргумент
 * @returns строку или undefined
 */
export function clearValue(
  value: string | string[] | number | boolean | undefined,
): string | string[] | undefined {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  return value ?? undefined;
}
