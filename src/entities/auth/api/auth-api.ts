import { http, schemeValidate } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { z } from 'zod';

const _api = {
  login: `${BASE_URL}/users/login/`,
  session: `${BASE_URL}/users/session/`,
  // logout: `${BASE_URL}/users/logout/`,
};

export const schemaSession = z
  .object({
    session: z
      .object({
        user: z.object({ id: z.number(), username: z.string() }),
        place: z.object({
          //TODO вставить схему витрины
          id: z.number(),
          name: z.string(),
        }),
      })
      .optional(),
  })
  .merge(schemeValidate);

// type IResponseSession = z.infer<typeof schemaSession>;

/**
 * Запрос на проверку сессии
 * @returns Валидный ответ или ошибка
 */
async function session() {
  const response = await http.get(_api.session);
  return schemaSession.parse(response);
}

interface IRequestLogin {
  username: string;
  password: string;
  saveSession?: boolean;
}

/**
 * Запрос проверки пользователя и пароля
 * @param value Объект : имя и пароль (на будущее запомнить сессию)
 * @returns Объект сессии или ошибку авторизации
 */
async function login(value: IRequestLogin) {
  const response = await http.post(_api.login, value);
  return schemaSession.parse(response);
}

export const authApi = {
  key: 'session',
  session,
  login,
};
