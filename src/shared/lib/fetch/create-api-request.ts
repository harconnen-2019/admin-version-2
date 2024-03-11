import { httpError, networkError, preparationError } from './fetch.errors';
import { formatHeaders, formatUrl } from './fetch.library';
import { FetchApiRecord, HttpMethod, RequestBody } from './fetch.types';

interface ApiRequest {
  method: HttpMethod;
  body?: RequestBody;
  headers?: FetchApiRecord;
  query?: FetchApiRecord;
  url: string;
}

interface ApiConfig {
  request: ApiRequest;
  abort?: AbortSignal;
}

/**
 * Создание запроса Fetch
 * Формируем URL и Headers, проверяем на ошибки ответ
 * @param config принимаем объект с аргументами для запроса
 * @returns данные | ошибку | undefined
 */
export async function createApiRequest(config: ApiConfig) {
  const response = await fetch(
    formatUrl({ href: config.request.url, query: config.request.query ?? {} }),
    {
      method: config.request.method,
      headers: formatHeaders(config.request.headers ?? {}),
      body: config.request.body,
      signal: config?.abort,
    },
  ).catch((error) => {
    throw networkError({
      reason: error?.message ?? undefined,
      cause: error,
    });
  });

  if (!response.ok) {
    throw httpError({
      status: response.status,
      statusText: response.statusText,
      response: (await response.text().catch(() => {})) ?? undefined,
    });
  }

  const clonedResponse = response.clone();

  return response.body
    ? await response.json().catch(async (error) => {
        throw preparationError({
          response: await clonedResponse.text(),
          reason: error?.message ?? undefined,
        });
      })
    : undefined;
}
