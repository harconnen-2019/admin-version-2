import { useQuery } from '@tanstack/react-query';

import { ServiceFetch } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';

import { schemaListTypeFromPlaces } from '../api/types';

const _api = `${BASE_URL}/places/type/`;
const typeFromPlacesApi = new ServiceFetch(_api, 'typeFromPlaces');

/**
 * Хук для вызова списка типов витрин
 * Подключается схема zod списка типов витрин, и схема валидации апи
 * @returns  Валидный ответ или ошибка
 */
export const useTypeFromPlacesList = () => {
  return useQuery({
    queryKey: [typeFromPlacesApi.keyList],
    queryFn: async () => {
      const response = await typeFromPlacesApi.list();
      return schemaListTypeFromPlaces.parse(response);
    },
  });
};
