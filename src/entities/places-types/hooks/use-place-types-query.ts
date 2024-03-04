import { useQuery } from '@tanstack/react-query';

import { ServiceFetch } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { schemaListPlaceType } from '../api/types';

const _api = `${BASE_URL}/places/type/`;
const placeTypeApi = new ServiceFetch(_api, 'placeType');

/**
 * Хук для вызова списка типов витрин
 * Подключается схема zod списка типов витрин, и схема валидации апи
 * @returns  Валидный ответ или ошибка
 */
export const usePlaceTypeList = () => {
  return useQuery({
    queryKey: [placeTypeApi.keyList],
    queryFn: async () => {
      const response = await placeTypeApi.list();
      return schemaListPlaceType.parse(response);
    },
  });
};
