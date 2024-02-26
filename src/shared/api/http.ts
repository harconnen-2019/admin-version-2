/*
https://eckertalex.dev/blog/typescript-fetch-wrapper
*/

import { DEBUG } from '../lib';

/**
 * Формирует HTTP запрос к серверу, применяет настройки, возвращает данные в формате json
 * @param path путь к api
 * @param config настройки вызова
 * @returns json данные или формирует ошибку
 */
async function _http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);
  // Log.log('Log: ', { path, request, response });

  if (!response.ok) {
    // Log.warn('Log:', response);
    throw new Error(`${response.status} (${response.statusText})`);
  }

  // может возникнуть ошибка при отсутствии тела, возвращается пустой массив
  const json = await response.json().catch(() => ({}));
  if (json.success !== 1) {
    throw new Error(`${json.err_mess || 'Неизвестная ошибка'}`);
  }

  return json;
}

/**
 * Формирование запроса для получения данных и определение типов
 * @param method Метод запроса
 * @returns Готовый запрос к api
 */
function newRequest(method: 'GET' | 'LIST' | 'PATCH' | 'DELETE') {
  return <T>(path: string, config?: RequestInit): Promise<T> => {
    const init = { method, ...config };
    return _http<T>(path, init);
  };
}

/**
 * Формирование запроса для отправки и получения данных и определение типов
 * @param method Метод запроса
 * @returns Готовый запрос к api
 */
function newMutate(method: 'POST' | 'PUT') {
  return <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
      },
      ...config,
    };
    return _http<U>(path, init);
  };
}

/**
 * Формирование запроса в формате formData для отправки и получения данных и определение типов
 * @param method Метод запроса
 * @returns Готовый запрос к api
 */
function newMutateFormData(method: 'POST' | 'PUT') {
  return <U>(path: string, body: FormData, config?: RequestInit): Promise<U> => {
    const init = {
      method,
      body,
      ...config,
    };
    return _http<U>(path, init);
  };
}

export const http = {
  get: newRequest('GET'),
  list: newRequest(DEBUG ? 'PATCH' : 'LIST'),
  post: newMutate('POST'),
  put: newMutate('PUT'),
  delete: newRequest('DELETE'),

  // Если данные отправляем в формате formData
  postFormData: newMutateFormData('POST'),
  // Если данные отправляем в формате formData
  putFormData: newMutateFormData('PUT'),
};
