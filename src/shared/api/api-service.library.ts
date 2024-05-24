import { FetchApiRecord, createJsonMutation, createJsonQuery } from '../lib/fetch';
import { Contract } from '../lib/zod';

import { baseUrl, methodList } from './api.library';

/**
 * Пример написания конфига
 */
// const configService = {
//   get: {
//     contract: zodContract(languageContracts.LanguageResponseSchema),
//     mapData: languageMap.queryResponse,
//   },
//   list: {
//     contract: zodContract(languageContracts.LanguageListResponseSchema),
//     mapData: languageMap.listResponse,
//   },
// };

// export const languageApi = new CreateService(_url, configService);

interface Config<Response, ContractData extends Response, MappedData> {
  get: {
    contract: Contract<Response, ContractData>;
    mapData: (data: ContractData) => MappedData;
  };
  list: {
    contract: Contract<Response, ContractData>;
    mapData: (data: ContractData) => MappedData[];
  };
}

/**
 * Класс для создания сервисов API
 */
export class CreateService<
  Response,
  ContractData extends Response,
  MappedData,
  Query extends FetchApiRecord,
  Create,
  Update,
> {
  private _url: string;
  private _config;

  constructor(url: string, config: Config<Response, ContractData, MappedData>) {
    this._url = baseUrl(url);
    this._config = config;
  }

  get api() {
    return this._url;
  }

  /**
   * Получение по id
   * Подключение схемы для проверки полученных данных
   * Callback map... формирует удобный объект из полученных данных
   * @param parameters параметры
   * @param parameters.query id языка
   * @param signal сигнал отмены
   * @returns запрос
   */
  async query(parameters: { query: Query }, signal?: AbortSignal) {
    return createJsonQuery({
      request: {
        url: this._url,
        method: 'GET',
        query: parameters.query,
      },
      response: this._config.get,
      abort: signal,
    });
  }

  /**
   * Получение списка
   * Подключение схемы для проверки полученных данных
   * Callback map... формирует удобный объект из полученных данных
   * @param signal сигнал отмены
   * @returns запрос
   */
  async listQuery(signal?: AbortSignal) {
    return createJsonQuery({
      request: {
        url: this._url,
        method: methodList(),
      },
      response: this._config.list,
      abort: signal,
    });
  }

  /**
   * Добавление
   * Подключение схемы для проверки полученных данных
   * Callback map... формирует удобный объект из полученных данных
   * @param parameters параметры
   * @param parameters.values новый элемент
   * @returns запрос
   */
  async createMutation(parameters: { values: Create }) {
    return createJsonMutation({
      request: {
        url: this._url,
        method: 'POST',
        body: JSON.stringify(parameters.values),
      },
      response: this._config.get,
    });
  }

  /**
   * Обновление
   * Подключение схемы для проверки полученных данных
   * Callback map... формирует удобный объект из полученных данных
   * @param parameters параметры
   * @param parameters.values новый элемент
   * @returns запрос
   */
  async updateMutation(parameters: { values: Update }) {
    return createJsonMutation({
      request: {
        url: this._url,
        method: 'PUT',
        body: JSON.stringify(parameters.values),
      },
      response: this._config.get,
    });
  }

  /**
   * Удаление
   * Подключение схемы для проверки полученных данных
   * Callback map... формирует удобный объект из полученных данных
   * @param parameters параметры
   * @param parameters.query id
   * @returns запрос
   */
  async removeMutation(parameters: { query: Query }) {
    return createJsonMutation({
      request: {
        url: this._url,
        method: 'DELETE',
        query: parameters.query,
      },
      response: this._config.get,
    });
  }
}
