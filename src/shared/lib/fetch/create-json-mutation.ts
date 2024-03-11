import { Contract } from '../zod';
import { createApiRequest } from './create-api-request';
import { invalidDataError, invalidSuccessError } from './fetch.errors';
import { FetchApiRecord, RequestBody } from './fetch.types';

interface JsonMutationConfig {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: FetchApiRecord;
  query?: FetchApiRecord;
  body?: RequestBody;
}

// Условный тип отправляет запрос, принимает контракт и callback
export async function createJsonMutation<
  Response,
  ContractData extends Response,
  MappedData,
>(config: {
  request: JsonMutationConfig;
  response: {
    contract: Contract<Response, ContractData>;
    mapData: (data: ContractData) => MappedData;
  };
}): Promise<MappedData>;

// Условный тип отправляет запрос, принимает контракт
export async function createJsonMutation<Response, ContractData extends Response>(config: {
  request: JsonMutationConfig;
  response: {
    contract: Contract<Response, ContractData>;
  };
}): Promise<ContractData>;

// Условный тип отправляет запрос, принимает callback
export async function createJsonMutation<
  Response,
  ContractData extends Response,
  MappedData,
>(config: {
  request: JsonMutationConfig;
  response: {
    mapData: (data: ContractData) => MappedData;
  };
}): Promise<MappedData>;

export async function createJsonMutation(config: { request: JsonMutationConfig }): Promise<unknown>;

/**
 * Формируем запрос на отправку 'POST' | 'PUT' | 'PATCH' | 'DELETE' и получение данных
 * @param config объект конфига
 * @param config.request объект запроса
 * @param config.response объект ответа
 * @param config.response.contract контракт для проверки ZOD
 * @param config.response.mapData callback для обработки полученных данных
 * @returns данные
 */
export async function createJsonMutation<
  Response,
  ContractData extends Response,
  MappedData,
>(config: {
  request: JsonMutationConfig;
  response?: {
    contract?: Contract<Response, ContractData>;
    mapData?: (data: ContractData) => MappedData;
  };
}) {
  const data = await createApiRequest({ request: config.request });

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
