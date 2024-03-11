import { baseUrl } from '@/shared/api';
import { createJsonMutation, createJsonQuery } from '@/shared/lib/fetch';
import { zodContract } from '@/shared/lib/zod';

import { sessionContracts } from './session.contracts';
import { sessionMap } from './session.library';
import { LoginUserRequest } from './session.types';

/**
 * Получение сессии пользователя
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param signal сигнал отмены
 * @returns запрос
 */
async function query(signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: baseUrl('/users/session/'),
      method: 'GET',
    },
    response: {
      contract: zodContract(sessionContracts.SessionResponseSchema),
      mapData: sessionMap.queryResponse,
    },
    abort: signal,
  });
}

/**
 * Авторизация пользователя
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param user пользователь
 * @returns запрос
 */
async function loginUserMutation(user: LoginUserRequest) {
  return createJsonMutation({
    request: {
      url: baseUrl('/users/login/'),
      method: 'POST',
      body: JSON.stringify(user),
    },
    response: {
      contract: zodContract(sessionContracts.SessionResponseSchema),
      mapData: sessionMap.queryResponse,
    },
  });
}

export const sessionApi = {
  query,
  loginUserMutation,
};
