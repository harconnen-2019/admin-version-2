import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/shared/lib';
import { database, initDataBase } from './database/database';

const apiSession = `${BASE_URL}/users/session/`;
const apiLogin = `${BASE_URL}/users/login/`;
const apiPlace = `${BASE_URL}/places/item/`;
const apiType = `${BASE_URL}/places/type/`;

initDataBase();

console.log(database.place.getAll());

export const handlers = [
  http.get(apiSession, () => {
    const outSession = {
      success: 1,
      session: database.session.findFirst({
        where: {
          id: {
            equals: 'session-id',
          },
        },
      }),
    };
    return HttpResponse.json(outSession);
  }),
  http.post(apiLogin, () => {
    const outSession = {
      success: 1,
      session: database.session.findFirst({
        where: {
          id: {
            equals: 'session-id',
          },
        },
      }),
    };
    return HttpResponse.json(outSession);
  }),
  http.get(apiPlace, () => {
    const outGet = {
      success: 1,
      places_item: database.place.findFirst({
        where: {
          id: {
            equals: 1,
          },
        },
      }),
    };
    return HttpResponse.json(outGet);
  }),
  http.patch(apiPlace, () => {
    const outList = {
      success: 1,
      places_item_list: database.place.getAll(),
    };
    console.log(outList);
    return HttpResponse.json(outList);
  }),
  http.delete(apiPlace, ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get('id');

    database.place.delete({
      where: {
        id: {
          equals: Number(productId),
        },
      },
    });

    const outGet = {
      success: 1,
      places_item: database.place.findFirst({
        where: {
          id: {
            equals: 1,
          },
        },
      }),
    };

    return HttpResponse.json(outGet);
  }),
  http.patch(apiType, () => {
    const out = {
      success: 1,
      places_type_list: database.type.getAll(),
    };
    return HttpResponse.json(out);
  }),
  // http.get('/api/red/users/session/', ({ request, params, cookies }) => {
  //   return HttpResponse.json(session);
  // }),
  http.get('/posts', () => {
    console.log('Captured a "GET /posts" request');
  }),
  http.post('/posts', () => {
    console.log('Captured a "POST /posts" request');
  }),
  http.delete('/posts/:id', ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
];
