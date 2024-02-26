import { placeType } from '@/entities/place';
import { http, schemaValidate } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { z } from 'zod';

const _api = {
  login: `${BASE_URL}/users/login/`,
  session: `${BASE_URL}/users/session/`,
  // logout: `${BASE_URL}/users/logout/`,
};

export const schemaSession = z.object({
  session: z
    .object({
      user: z.object({ id: z.number(), username: z.string() }),
      place: placeType.schemaPlace,
    })
    .optional(),
});

// type IResponseSession = z.infer<typeof schemaSession>;

/**
 * Запрос на проверку сессии
 * Подключается схема zod сессии, и схема валидации апи
 * @returns Валидный ответ или ошибка
 */
async function session() {
  const response = await http.get(_api.session);
  return schemaSession.merge(schemaValidate).parse(response);
}

interface IRequestLogin {
  username: string;
  password: string;
  saveSession?: boolean;
}

/**
 * Запрос проверки пользователя и пароля
 * Подключается схема zod сессии, и схема валидации апи
 * @param value Объект : имя и пароль (на будущее запомнить сессию)
 * @returns Объект сессии или ошибку авторизации
 */
async function login(value: IRequestLogin) {
  const response = await http.post(_api.login, value);
  return schemaSession.merge(schemaValidate).parse(response);
}

export const authApi = {
  key: 'session',
  session,
  login,
};
