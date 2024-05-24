import { Place, PlaceList, PlaceListResponse, PlaceResponse } from './place.types';

/**
 * Обработка полученных данных, и преобразование в удобный формат витрины
 * @param placeResponse ответ сервера
 * @returns Place
 */
function queryResponse(placeResponse: PlaceResponse): Place {
  return {
    ...placeResponse.places_item!,
  };
}

/**
 * Обработка полученных данных, и преобразование в удобный формат списка витрин
 * @param placeListResponse ответ сервера
 * @returns PlaceList
 */
function listResponse(placeListResponse: PlaceListResponse): PlaceList {
  const result = placeListResponse.places_item_list ?? [];
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

export const placeMap = { queryResponse, listResponse };
