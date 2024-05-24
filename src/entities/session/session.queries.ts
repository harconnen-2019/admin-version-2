import { queryOptions as tsqQueryOptions, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '@/shared/lib/react-query';
import { pathKeys } from '@/shared/lib/react-router';

import { sleepDebug } from '@/shared/api';
import { sessionApi } from './session.api';
import { Session } from './session.types';

/**
 * Комплект стартовых ключей для сервиса
 */
const keys = {
  root: () => ['session'] as const,
  currentSession: () => [...keys.root(), 'currentSession'] as const,
  loginUser: () => [...keys.root(), 'loginUser'] as const,
};

/**
 * Сервис для получения сессии пользователя
 * Методы сервиса:
 * / получение ключа
 * / получение, запись, удаление кеша
 * / формирование запроса
 * / предварительная выборка
 * / данные существующего запроса
 */
const sessionService = {
  queryKey: () => keys.currentSession(),

  getCache: () => queryClient.getQueryData<Session>(sessionService.queryKey()),

  setCache: (session: Session | undefined) =>
    queryClient.setQueryData(sessionService.queryKey(), session),

  removeCache: () => queryClient.removeQueries({ queryKey: sessionService.queryKey() }),

  queryOptions: () => {
    const key = sessionService.queryKey();

    return tsqQueryOptions({
      queryKey: key,
      queryFn: async ({ signal }) => sessionApi.query(signal),
      initialData: () => sessionService.getCache()!,
      initialDataUpdatedAt: () => queryClient.getQueryState(key)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async () => {
    await sleepDebug();
    queryClient.prefetchQuery(sessionService.queryOptions());
  },

  ensureQueryData: async () => queryClient.ensureQueryData(sessionService.queryOptions()),
};

/**
 * Авторизация пользователя со страницы /login
 * @returns useMutation
 */
function useLoginUserMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: keys.loginUser(),
    mutationFn: sessionApi.loginUserMutation,

    onSuccess: async (session) => {
      // sessionStore.setState({ token: user.token });
      if (session.success === 1) {
        sessionService.setCache(session);
        navigate(pathKeys.home());
      }
    },
  });
}

export const sessionQueries = { sessionService, useLoginUserMutation };
