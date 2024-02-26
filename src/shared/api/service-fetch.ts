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
    return this._key;
  }
  get keyList() {
    return `${this._key}-list`;
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
