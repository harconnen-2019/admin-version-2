import { Contract } from '../zod';
import { createApiRequest } from './create-api-request';
import { invalidDataError, invalidSuccessError } from './fetch.errors';
import { FetchApiRecord } from './fetch.types';

interface JsonQueryConfig {
  url: string;
  method: 'HEAD' | 'GET' | 'LIST' | 'PATCH';
  headers?: FetchApiRecord;
  query?: FetchApiRecord;
}

// Условный тип принимает запрос, контракт и callback
export async function createJsonQuery<Response, ContractData extends Response, MappedData>(config: {
  request: JsonQueryConfig;
  response: {
    contract: Contract<Response, ContractData>;
    mapData: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}): Promise<MappedData>;

// Условный тип принимает запрос и контракт
export async function createJsonQuery<Response, ContractData extends Response>(config: {
  request: JsonQueryConfig;
  response: {
    contract: Contract<Response, ContractData>;
  };
  abort?: AbortSignal;
}): Promise<ContractData>;

// Условный тип принимает запрос и callback
export async function createJsonQuery<Response, ContractData extends Response, MappedData>(config: {
  request: JsonQueryConfig;
  response: {
    mapData: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}): Promise<MappedData>;

// Условный тип без контракта и callback
export async function createJsonQuery(config: {
  request: JsonQueryConfig;
  abort?: AbortSignal;
}): Promise<unknown>;

/**
 * Формируем запрос на получение данных 'HEAD' | 'GET'
 * @param config объект конфига
 * @param config.request объект запроса
 * @param config.response объект ответа
 * @param config.response.contract контракт для проверки ZOD
 * @param config.response.mapData callback для обработки полученных данных
 * @param config.abort AbortSignal
 * @returns данные
 */
export async function createJsonQuery<Response, ContractData extends Response, MappedData>(config: {
  request: JsonQueryConfig;
  response?: {
    contract?: Contract<Response, ContractData>;
    mapData?: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}) {
  const data = await createApiRequest({
    request: config.request,
    abort: config.abort,
  });

  // Если ZOD при проверке выдал ошибку
  if (config?.response?.contract && !config.response.contract.isData(data)) {
    throw invalidDataError({
      validationErrors: config.response.contract.getErrorMessages(data),
      response: data,
    });
  }

  // Ошибка внутри ответа { success = 0 }
  if (data.success !== 1) {
    throw invalidSuccessError({
      response: await data,
      errMess: await data.err_mess,
      errCode: await data.err_code,
    });
  }

  // Если есть метод структурирования возврата данных применяем его, если нет просто возвращаем данные
  return config?.response?.mapData ? config.response.mapData(data) : data;
}
