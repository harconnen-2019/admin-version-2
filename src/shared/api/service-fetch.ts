import { http } from './http';
import { IRequestParameters } from './schemes-merge';

/**
 * Формирует сервис для отправки и получения данных с сервера
 * Определяет интерфейсы данных для отправки и получения
 * @param {string} url - Endpoint URL
 * G - Response GET
 * L - Response LIST
 * V - Request POST
 * P - Response POST
 * V1- Request PUT
 * U - Response PUT
 * D - Response DELETE
 */
export class ServiceFetch<G, L, V, P, V1, U, D> {
  protected readonly _api;

  constructor(url: string) {
    this._api = url;
  }

  get key() {
    return this._api;
  }

  get(id: string | number, parameters?: IRequestParameters): Promise<G> {
    return http.get(`${this._api}?id=${id}${this.queryString('&', parameters)}`);
  }

  list(parameters?: IRequestParameters) {
    return http.list<L>(`${this._api}${this.queryString('?', parameters)}`);
  }

  create(value: V) {
    return http.post<V, P>(this._api, value);
  }

  update(value: V1) {
    return http.put<V1, U>(this._api, value);
  }

  remove(id: string | number): Promise<D> {
    return http.delete(`${this._api}?id=${id}`);
  }

  protected queryString(string_: '?' | '&', parameters?: IRequestParameters) {
    return parameters ? `${string_}${this._objectToQueryString(parameters)}` : '';
  }

  protected _objectToQueryString(object: IRequestParameters) {
    return Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join('&');
  }
}
