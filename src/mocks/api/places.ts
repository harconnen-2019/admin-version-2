/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';
import { database } from '../database/database';

const api = `${BASE_URL}/places/item/`;

const outGet = {};
const outList = {};

const getPlace = http.get(api, () => {
  return HttpResponse.json(outGet);
});

const listPlaces = http.patch(api, () => {
  return HttpResponse.json(outList);
});

const postPlaces = http.post(api, () => {
  return HttpResponse.json(outGet);
});

const putPlaces = http.put(api, () => {
  return HttpResponse.json(outGet);
});

const deletePlace = http.delete(api, ({ request }) => {
  const url = new URL(request.url);
  const productId = url.searchParams.get('id');

  database.place.delete({
    where: {
      id: {
        equals: Number(productId),
      },
    },
  });

  return HttpResponse.json(outGet);
});

export const httpPlaces = [getPlace, postPlaces, putPlaces, listPlaces, deletePlace];
