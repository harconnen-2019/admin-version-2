import * as types from './fetch.types';

/**
 * Охранник ошибки INVALID_DATA
 * @param error ошибка
 * @returns boolean
 */
export function isInvalidDataError(
  error: types.GenericError<string>,
): error is types.InvalidDataError {
  return error?.errorType === types.INVALID_DATA;
}

/**
 * Охранник ошибки PREPARATION
 * @param error ошибка
 * @returns boolean
 */
export function isPreparationError(
  error: types.GenericError<string>,
): error is types.PreparationError {
  return error?.errorType === types.PREPARATION;
}

/**
 * Охранник ошибки HTTP
 * @param error ошибка
 * @returns boolean
 */
export function isHttpError(error: types.GenericError<string>): error is types.HttpError {
  return error?.errorType === types.HTTP;
}

/**
 * Охранник ошибки ErrorCode
 * @param code код ошибки
 * @returns boolean
 */
export function isHttpErrorCode<Code extends number>(code: Code | Code[]) {
  return function isExactHttpError(
    error: types.GenericError<string>,
  ): error is types.HttpError<Code> {
    if (!isHttpError(error)) {
      return false;
    }

    const codes = Array.isArray(code) ? code : [code];

    return codes.includes(error.status as never);
  };
}

/**
 * Охранник ошибки NETWORK
 * @param error ошибка
 * @returns boolean
 */
export function isNetworkError(error: types.GenericError<string>): error is types.NetworkError {
  return error?.errorType === types.NETWORK;
}
