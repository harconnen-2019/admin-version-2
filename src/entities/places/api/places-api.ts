import { IRequestParameters, ServiceFetch, http } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { schemaGetPlace, schemaListPlace } from './types';

const _api = `${BASE_URL}/places/item/`;

class PlaceApi extends ServiceFetch {
  /**
   * Запрос на получение витрины по ID
   * Подключается схема zod витрины, и схема валидации апи
   * @param id идентификатор витрины
   * @param parameters объект со списком дополнительных параметров
   * @returns Валидный ответ или ошибка
   */
  async get(id: string | number, parameters?: IRequestParameters) {
    const response = await http.get(`${this._api}?id=${id}${this.queryString('&', parameters)}`);
    return schemaGetPlace.parse(response);
  }

  /**
   * Запрос на получение списка витрин
   * Подключается схема zod списка витрин, и схема валидации апи
   * @param parameters при необходимости объект с параметрами
   * @returns Валидный ответ или ошибка
   */
  async list(parameters?: IRequestParameters) {
    const response = await http.list(`${this._api}${this.queryString('?', parameters)}`);
    return schemaListPlace.parse(response);
  }

  /**
   * Запрос делает выбранную витрину активной. Меняет данные сессии с сервере
   * Подключается схема zod витрины, и схема валидации апи
   * @param id ИД витрины
   * @returns Валидный ответ или ошибка
   */
  async select(id: string | number) {
    const response = await http.get(`${this._api}?id=${id}&select=1`);
    return schemaGetPlace.parse(response);
  }

  /**
   * Запрос на создание новой витрины
   * Подключается схема zod витрины, и схема валидации апи
   * @param value Данные новой витрины в формате FormData
   * @returns Валидный ответ или ошибка
   */
  async create(value: FormData) {
    const response = await http.postFormData(this._api, value);
    return schemaGetPlace.parse(response);
  }

  /**
   * Запрос на редактирование новой витрины
   * ИД указывается в value
   * Подключается схема zod витрины, и схема валидации апи
   * @param value Измененные данные витрины в формате FormData
   * @returns Валидный ответ или ошибка
   */
  async update(value: FormData) {
    const response = await http.putFormData(this._api, value);
    return schemaGetPlace.parse(response);
  }

  /**
   * Запрос на удаление витрины
   * Подключается схема zod витрины, и схема валидации апи
   * @param id ID удаляемой витрины
   * @returns Валидный ответ или ошибка
   */
  async remove(id: string | number) {
    const response = await http.delete(`${this._api}?id=${id}`);
    return schemaGetPlace.parse(response);
  }
}

export const placeApi = new PlaceApi(_api, 'place');
