import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { http } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { useNavigate } from 'react-router-dom';
import { IRequestLogin, schemaSession } from '../api/types';

const queryClient = new QueryClient();

const _api = {
  login: `${BASE_URL}/users/login/`,
  session: `${BASE_URL}/users/session/`,
  // logout: `${BASE_URL}/users/logout/`,
};

/**
 * Хук для авторизации
 * Подключается схема zod сессии, и схема валидации апи
 * @returns  сессия или ошибка
 */
export const useGetAuth = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await http.get(_api.session);
      return schemaSession.parse(response);
    },
  });
};

/**
 * Хук для Логина
 * Подключается схема zod витрины, и схема валидации апи
 * @returns  мутацию
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (value: IRequestLogin) => {
      const response = await http.post(_api.login, value);
      return schemaSession.parse(response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      if (data.success === 1) {
        navigate(-1);
      }
    },
  });
};
