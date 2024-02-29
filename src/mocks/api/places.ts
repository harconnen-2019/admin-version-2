/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';
import { database } from '../database/database';
import { databaseType } from './places-types';

const api = `${BASE_URL}/places/item/`;

export const databasePlace = database.place.create({ id: 1, type: databaseType });

for (let index = 2; index < 6; index++) {
  database.place.create({ id: index, type: databaseType });
}

const outList = {
  success: 1,
  places_item_list: database.place.getAll(),
};

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

const deletePlace = http.delete(api, () => {
  return HttpResponse.json(outGet);
});

export const httpPlaces = [getPlace, postPlaces, putPlaces, listPlaces, deletePlace];
