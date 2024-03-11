import * as types from './fetch.types';

/**
 * Формирует ошибку валидации (ZOD)
 * передает принимаемые данные дальше + стандартизирует
 * @param config принимает объект
 * @param config.validationErrors ошибки сформированные ZOD
 * @param config.response ответ
 * @returns объект с параметрами
 */
export function invalidDataError(config: {
  validationErrors: string[];
  response: unknown;
}): types.InvalidDataError {
  return {
    ...config,
    errorType: types.INVALID_DATA,
    explanation: 'Ответ нарушен в отношении контракта',
  };
}

/**
 * Формирует ошибку внутри ответа { success = 0 }
 * передает принимаемые данные дальше + стандартизирует
 * @param config принимает объект
 * @param config.response ответ
 * @param config.errMess название ошибки из ответа
 * @param config.errCode код ошибки из ответа
 * @returns объект с параметрами
 */
export function invalidSuccessError(config: {
  errMess: string;
  errCode: string;
  response: unknown;
}): types.InvalidSuccessError {
  return {
    ...config,
    errorType: types.INVALID_SUCCESS,
    explanation: `${config.errMess ?? 'Неизвестная ошибка'}, code: ${config.errCode ?? '..'}`,
  };
}

/**
 * Формирует ошибку если данные отсутствуют
 * передает принимаемые данные дальше + стандартизирует
 * @param config принимает объект
 * @param config.response ответ
 * @param config.reason причина
 * @returns объект с параметрами
 */
export function preparationError(config: {
  response: string;
  reason: string | undefined;
}): types.PreparationError {
  return {
    ...config,
    errorType: types.PREPARATION,
    explanation: 'Ошибка данных из ответа',
  };
}

/**
 * Формирует ошибку с неудачным HTTP-кодом
 * передает принимаемые данные дальше + стандартизирует
 * @param config принимает объект
 * @param config.status статус (ok)
 * @param config.statusText текст статуса
 * @param config.response ответ
 * @returns объект с параметрами
 */
export function httpError(config: {
  status: number;
  statusText: string;
  response: string | types.Json | undefined;
}): types.HttpError {
  return {
    ...config,
    errorType: types.HTTP,
    explanation: 'Запрос был завершен с неудачным HTTP-кодом',
  };
}

/**
 * Формирует ошибку сети
 * передает принимаемые данные дальше + стандартизирует
 * @param config принимает объект
 * @param config.reason ответ
 * @param config.cause причина
 * @returns объект с параметрами
 */
export function networkError(config: {
  reason: string | undefined;
  cause?: unknown;
}): types.NetworkError {
  return {
    ...config,
    errorType: types.NETWORK,
    explanation: 'Запрос не был выполнен из-за проблем с сетью',
  };
}
