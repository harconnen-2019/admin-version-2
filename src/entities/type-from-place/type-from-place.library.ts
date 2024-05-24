import { TypeFromPlaceList, TypeFromPlaceListResponse } from './type-from-place.types';

/**
 * Обработка полученных данных, и преобразование в удобный формат Типа
 * @param typeFromPlaceResponse ответ сервера
 * @returns TypeFromPlace
 */
// function mapTypeFromPlace(typeFromPlaceResponse: TypeFromPlaceResponse): TypeFromPlace {
//   return {
//     ...typeFromPlaceResponse.places_type!,
//   };
// }

/**
 * Обработка полученных данных, и преобразование в удобный формат списка типов
 * @param typeFromPlaceListResponse ответ сервера
 * @returns TypeFromPlaceList
 */
export function listResponse(
  typeFromPlaceListResponse: TypeFromPlaceListResponse,
): TypeFromPlaceList {
  const result = typeFromPlaceListResponse.places_type_list ?? [];
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

export const typeFromPlaceListMap = { listResponse };
