import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryClient, reactQueryLibrary } from '@/shared/lib/react-query';
import { pathKeys } from '@/shared/lib/react-router';

import { sleepDebug } from '@/shared/api';
import { sessionQueries } from '../session';
import { placeApi } from './place.api';
import { Place, PlaceList } from './place.types';

/**
 * Комплект стартовых ключей для сервиса
 */
const keys = {
  root: () => ['place'],
  byId: (id: string) => [...keys.root(), 'byId', id] as const,
  list: () => [...keys.root(), 'list'] as const,
  select: () => [...keys.root(), 'select'] as const,
  create: () => [...keys.root(), 'create'] as const,
  update: (id: string) => [...keys.root(), 'update', id] as const,
  remove: () => [...keys.root(), 'remove'] as const,
};

/**
 * Сервис для получения витрины по id
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const serviceById = {
  queryKey: (id: string) => keys.byId(id),

  getCache: (id: string) => queryClient.getQueryData<Place>(serviceById.queryKey(id)),

  setCache: (place: Place) =>
    queryClient.setQueryData(serviceById.queryKey(String(place.id)), place),

  removeCache: (id: string) =>
    queryClient.removeQueries({ queryKey: serviceById.queryKey(id), exact: true }),

  queryOptions: (id: string) => {
    const key = serviceById.queryKey(id);

    return tsqQueryOptions({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: key,
      queryFn: async ({ signal }) => await placeApi.query({ query: { id } }, signal),
      initialData: () => serviceById.getCache(id)!,
      initialDataUpdatedAt: () => queryClient.getQueryState(key)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async (id: string) => {
    await sleepDebug();
    queryClient.prefetchQuery(serviceById.queryOptions(id));
  },

  ensureQueryData: async (id: string) => queryClient.ensureQueryData(serviceById.queryOptions(id)),
};

/**
 * Сервис для получения списка витрин
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const serviceList = {
  queryKey: () => keys.list(),

  getCache: () => queryClient.getQueryData<PlaceList>(serviceList.queryKey()),

  queryOptions: () => {
    const key = serviceList.queryKey();

    return tsqQueryOptions({
      queryKey: key,
      queryFn: async ({ signal }) => await placeApi.listQuery(signal),
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

/**
 * Метод для выбора активной витрины по id
 * При ошибке срабатывает уведомление
 * @returns  useMutation
 */
const useSelectMutation = () => {
  const queryClient = useQueryClient();
  const selectKey = keys.select();

  return useMutation({
    mutationKey: selectKey,
    mutationFn: async (id: string | number) => await placeApi.query({ query: { id, select: 1 } }),

    onError: (error) => {
      reactQueryLibrary.toast.error(error.explanation + ' 🤥');
    },

    onSuccess: () => {
      // Обновляем текущую сессию
      queryClient.invalidateQueries({ queryKey: sessionQueries.sessionService.queryKey() });
    },
  });
};

/**
 * Метод создания новой витрины с обновлением списка витрин
 * После добавления переходит к списку
 * @returns useMutation
 */
function useCreateMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createKey = keys.create();

  return useMutation({
    mutationKey: createKey,
    mutationFn: placeApi.createMutation,

    onSuccess: (place) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.setCache(place);
      navigate(pathKeys.places.root());
    },
  });
}

/**
 * Метод отправки изменения витрины с обновлением списка витрин
 * После добавления переходит к списку
 * @param id id для ключа
 * @returns useMutation
 */
function useUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateKey = keys.update(id);

  return useMutation({
    mutationKey: updateKey,
    mutationFn: placeApi.updateMutation,

    onSuccess: (place) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.setCache(place);
      navigate(pathKeys.places.root());
    },
  });
}

/**
 * Метод удаление витрины с обновлением списка витрин
 * Вызывает модальное окно для подтверждения
 * После выполнения или при ошибке срабатывает уведомление
 * @returns Модальное окно с методом удаления витрины
 */
const useRemoveMutation = () => {
  const queryClient = useQueryClient();
  const removeKey = keys.remove();

  const { mutate: remove } = useMutation({
    mutationKey: removeKey,
    mutationFn: async (id: number) => await placeApi.removeMutation({ query: { id: String(id) } }),

    onError: (error) => {
      reactQueryLibrary.toast.error(error.explanation + ' 🤥');
    },

    onSuccess: (place) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.removeCache(String(place.id));

      reactQueryLibrary.toast.success(`Вы удалили витрину ${place.name}!`);
    },
  });

  return (id: number, name: string) => reactQueryLibrary.removeConfirmModal(id, name, remove);
};

export const placeQueries = {
  serviceById,
  serviceList,
  useSelectMutation,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
};
