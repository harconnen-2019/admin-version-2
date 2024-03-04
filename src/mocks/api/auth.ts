import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';
import { database } from '../database/database';

const apiSession = `${BASE_URL}/users/session/`;
const apiLogin = `${BASE_URL}/users/login/`;

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
  };
};

const getSession = http.get(apiSession, () => {
  return HttpResponse.json(outGet());
});

const getLogin = http.post(apiLogin, () => {
  return HttpResponse.json(outGet());
});

export const httpAuth = [getSession, getLogin];
