import { baseUrl } from '@/shared/api';
import { HttpResponse, delay, http } from 'msw';
import { database } from '../database/database';

const apiSession = baseUrl('/users/session/');
const apiLogin = baseUrl('/users/login/');

const outGet = () => {
  return {
    success: 1,
    session: database.session.findFirst({
      where: {
        id: {
          equals: 'session-id',
        },
      },
    }),
    err_mess: 'Ошибка для теста',
    err_code: 505,
  };
};

const getSession = http.get(apiSession, async () => {
  await delay();
  return HttpResponse.json(outGet());
});

const getLogin = http.post(apiLogin, async () => {
  await delay();
  return HttpResponse.json(outGet());
});

export const httpAuth = [getSession, getLogin];
