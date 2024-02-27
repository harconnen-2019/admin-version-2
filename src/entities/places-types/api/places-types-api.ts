import { IRequestParameters, ServiceFetch, http } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { schemaGetPlaceType, schemaListPlaceType } from './types';

const _api = `${BASE_URL}/places/type/`;

class PlaceTypeApi extends ServiceFetch {
  /**
   * Запрос на получение типа витрины по ID
   * Подключается схема zod типа витрины, и схема валидации апи
   * @param id идентификатор типа витрины
   * @param parameters объект со списком дополнительных параметров
   * @returns Валидный ответ или ошибка
   */
  async get(id: string | number, parameters?: IRequestParameters) {
    const response = await http.get(`${this._api}?id=${id}${this.queryString('&', parameters)}`);
    return schemaGetPlaceType.parse(response);
  }

  /**
   * Запрос на получение списка типов витрин
   * Подключается схема zod списка типов витрин, и схема валидации апи
   * @param parameters при необходимости объект с параметрами
   * @returns Валидный ответ или ошибка
   */
  async list(parameters?: IRequestParameters) {
    const response = await http.list(`${this._api}${this.queryString('?', parameters)}`);
    return schemaListPlaceType.parse(response);
  }
}

export const placeTypeApi = new PlaceTypeApi(_api, 'placeType');
