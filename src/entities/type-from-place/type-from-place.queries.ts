import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';

import { queryClient } from '@/shared/lib/react-query';

import { sleepDebug } from '@/shared/api';
import { typeFromPlaceApi } from './type-from-place.api';
import { TypeFromPlaceList } from './type-from-place.types';

/**
 * Комплект стартовых ключей для сервиса
 */
const keys = {
  root: () => ['typeFromPlace'] as const,
  list: () => [...keys.root(), 'list'] as const,
};

/**
 * Сервис для получения типов для витрины
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const serviceList = {
  queryKey: () => keys.list(),

  getCache: () => queryClient.getQueryData<TypeFromPlaceList>(serviceList.queryKey()),

  queryOptions: () => {
    const key = serviceList.queryKey();

    return tsqQueryOptions({
      queryKey: key,
      queryFn: async ({ signal }) => await typeFromPlaceApi.query(signal),
      initialData: () => serviceList.getCache()!,
      initialDataUpdatedAt: () => queryClient.getQueryState(key)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async () => {
    await sleepDebug();
    queryClient.prefetchQuery(serviceList.queryOptions());
  },

  ensureQueryData: async () => queryClient.ensureQueryData(serviceList.queryOptions()),
};

export const typeFromPlaceQueries = { serviceList };
