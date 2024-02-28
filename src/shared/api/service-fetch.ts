import { http } from '.';
import { IRequestParameters } from './schemes-merge';

/**
 * Формирует сервис для отправки и получения данных с сервера
 * имеет дополнительные методы [queryString] для формирования параметров запроса
 * Создает ключи для react-query
 * @param {string} url - Endpoint URL
 * @param {string} nameKey - Название ключа в "существительное в единственном числе"
 */
export class ServiceFetch {
  protected readonly _api;
  protected readonly _key;

  constructor(url: string, nameKey: string) {
    this._api = url;
    this._key = nameKey;
  }

  get api() {
    return this._api;
  }
  get keyId() {
    return `${this._key}-`;
  }
  get keyList() {
    return `${this._key}list`;
  }

  /**
   * Запрос на получение данных по ID
   * @param id идентификатор витрины
   * @param parameters объект со списком дополнительных параметров
   * @returns Валидный ответ или ошибка
   */
  async get(id: string | number, parameters?: IRequestParameters) {
    return await http.get(`${this._api}?id=${id}${this.queryString('&', parameters)}`);
  }

  /**
   * Запрос на получение списка
   * @param parameters при необходимости объект с параметрами
   * @returns Валидный ответ или ошибка
   */
  async list(parameters?: IRequestParameters) {
    return await http.list(`${this._api}${this.queryString('?', parameters)}`);
  }

  /**
   * Запрос на создание
   * @param value данные для отправки
   * @returns Валидный ответ или ошибка
   */
  async create<T>(value: T) {
    return await http.post(this._api, value);
  }

  // Запрос на создание но с данными FormData
  async createFormData(value: FormData) {
    return await http.postFormData(this._api, value);
  }

  /**
   * Запрос на обновление
   * @param value данные для отправки
   * @returns Валидный ответ или ошибка
   */
  async update<T>(value: T) {
    return await http.put(this._api, value);
  }

  // Запрос на обновление но с данными FormData
  async updateFormData(value: FormData) {
    return await http.putFormData(this._api, value);
  }

  /**
   * Запрос на удаление витрины
   * @param id ID удаляемого элемента
   * @returns Валидный ответ или ошибка
   */
  async remove(id: string | number) {
    return await http.delete(`${this._api}?id=${id}`);
  }

  /**
   * Преобразует объект в строку с параметрами разделяя &
   * @param string_ начало параметров, опционально - ?
   * @param parameters объект со списком параметров
   * @returns строка с параметрами начинается на "?" или задать свой
   */
  protected queryString(string_: '?' | '&', parameters?: IRequestParameters) {
    return parameters ? `${string_}${this._objectToQueryString(parameters)}` : '';
  }

  /**
   * Проходит по объекту и возвращает строку из объектов, разделяя &
   * @param object объект с параметрами
   * @returns строка из параметров с разделителем &
   */
  protected _objectToQueryString(object: IRequestParameters) {
    return Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join('&');
  }
}
