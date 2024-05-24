/**
 * LIST - это нестандартный кастомный метод
 */
export type HttpMethod =
  | 'HEAD'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'QUERY'
  | 'OPTIONS'
  | 'LIST';

export type RequestBody = Blob | BufferSource | FormData | string;

export type FetchApiRecord = Record<string, string | string[] | number | boolean | undefined>;

export type Json = null | undefined | boolean | string | number | Json[] | { [k: string]: Json };

/**
 * Общая структура для всех ошибок, наследуется всеми ошибками
 * тип ошибки формируем из константы
 * текстовое объяснение ошибки
 */
export type GenericError<T extends string> = {
  errorType: T;
  explanation: string;
};

/**
 * Ошибка внутри ответа { success = 0 }
 */
export const INVALID_SUCCESS = 'INVALID_SUCCESS';
export interface InvalidSuccessError extends GenericError<typeof INVALID_SUCCESS> {
  errMess: string;
  errCode: string;
  response: unknown;
}

/**
 * Ошибка валидации (ZOD)
 */
export const INVALID_DATA = 'INVALID_DATA';
export interface InvalidDataError extends GenericError<typeof INVALID_DATA> {
  validationErrors: string[];
  response: unknown;
}

/**
 * Ошибка извлечения данных fetch
 */
export const PREPARATION = 'PREPARATION';
export interface PreparationError extends GenericError<typeof PREPARATION> {
  response: string;
  reason: string | undefined;
}

/**
 * Ответ HTTP с ошибкой
 */
export const HTTP = 'HTTP';
export interface HttpError<Status extends number = number> extends GenericError<typeof HTTP> {
  status: Status;
  statusText: string;
  response: string | Json | undefined;
}

/**
 * Проблемы сети
 */
export const NETWORK = 'NETWORK';
export interface NetworkError extends GenericError<typeof NETWORK> {
  reason: string | undefined;
  cause?: unknown;
}
