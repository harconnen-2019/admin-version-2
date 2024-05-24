import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryClient, reactQueryLibrary } from '@/shared/lib/react-query';
import { pathKeys } from '@/shared/lib/react-router';

import { sleepDebug } from '@/shared/api';

import { languageApi } from './language.api';
import { Language, LanguageList } from './language.types';

/**
 * Комплект стартовых ключей для сервиса
 */
const keys = {
  root: () => ['language'] as const,
  byId: (id: string) => [...keys.root(), 'byId', id] as const,
  list: () => [...keys.root(), 'list'] as const,
  create: () => [...keys.root(), 'create'] as const,
  update: (id: string) => [...keys.root(), 'update', id] as const,
  remove: () => [...keys.root(), 'remove'] as const,
};

/**
 * Сервис для получения языка по id
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const serviceById = {
  queryKey: (id: string) => keys.byId(id),

  getCache: (id: string) => queryClient.getQueryData<Language>(serviceById.queryKey(id)),

  setCache: (language: Language) =>
    queryClient.setQueryData(serviceById.queryKey(String(language.id)), language),

  removeCache: (id: string) => queryClient.removeQueries({ queryKey: serviceById.queryKey(id) }),

  queryOptions: (id: string) => {
    const key = serviceById.queryKey(id);

    return tsqQueryOptions({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: key,
      queryFn: async ({ signal }) => await languageApi.query({ query: { id } }, signal),
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
 * Сервис для получения списка языков
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const serviceList = {
  queryKey: () => keys.list(),

  getCache: () => queryClient.getQueryData<LanguageList>(serviceList.queryKey()),

  queryOptions: () => {
    const key = serviceList.queryKey();

    return tsqQueryOptions({
      queryKey: key,
      queryFn: async ({ signal }) => await languageApi.listQuery(signal),
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
 * Метод создания нового языка с обновлением списка языков
 * После добавления переходит к списку
 * @returns useMutation
 */
function useCreateMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createKey = keys.create();

  return useMutation({
    mutationKey: createKey,
    mutationFn: languageApi.createMutation,
    onSuccess: (language) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.setCache(language);
      navigate(pathKeys.languages.root());
    },
  });
}

/**
 * Метод отправки изменения языка с обновлением списка языков
 * После добавления переходит к списку
 * @param id id
 * @returns useMutation
 */
function useUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateKey = keys.update(id);

  return useMutation({
    mutationKey: updateKey,
    mutationFn: languageApi.updateMutation,

    onSuccess: (language) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.setCache(language);
      navigate(pathKeys.languages.root());
    },
  });
}

/**
 * Метод удаление языка с обновлением списка языков
 * Вызывает модальное окно для подтверждения
 * После выполнения или при ошибке срабатывает уведомление
 * @returns Модальное окно с методом удаления языка
 */
const useRemoveMutation = () => {
  const queryClient = useQueryClient();
  const removeKey = keys.remove();

  const { mutate: remove } = useMutation({
    mutationKey: removeKey,
    mutationFn: async (id: number) =>
      await languageApi.removeMutation({ query: { id: String(id) } }),

    onError: (error) => {
      reactQueryLibrary.toast.error(error.explanation + ' 🤥');
    },

    onSuccess: (language) => {
      queryClient.invalidateQueries({ queryKey: serviceList.queryKey() });
      serviceById.removeCache(String(language.id));

      reactQueryLibrary.toast.success(`Вы удалили язык ${language.name} !`);
    },
  });

  return (id: number, name: string) => reactQueryLibrary.removeConfirmModal(id, name, remove);
};

export const languageQueries = {
  serviceById,
  serviceList,
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
};
