import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';
import { database } from '../database/database';
import { databasePlace } from './places';

const apiSession = `${BASE_URL}/users/session/`;
const apiLogin = `${BASE_URL}/users/login/`;

const user = database.user.create({ id: 1 });

database.session.create({
  id: 'session-id',
  place: databasePlace,
  user: user,
});

const out = {
  success: 1,
  session: database.session.findFirst({
    where: {
      id: {
        equals: 'session-id',
      },
    },
  }),
};

const getSession = http.get(apiSession, () => {
  return HttpResponse.json(out);
});

const getLogin = http.post(apiLogin, () => {
  return HttpResponse.json(out);
});

export const httpAuth = [getSession, getLogin];
