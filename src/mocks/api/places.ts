/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';
import { database } from '../database/database';

const api = `${BASE_URL}/places/item/`;

const outGetId = (id: string | null) => {
  if (id === '0')
    return {
      success: 0,
      err_mess: 'Ошибка для теста',
      err_code: '505',
    };

  return {
    success: 1,
    places_item: database.place.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    }),
  };
};

const select = (placeId: string | null) => {
  database.session.delete({
    where: {
      id: {
        equals: 'session-id',
      },
    },
  });

  const databasePlace = (placeId: string | null) => {
    return database.place.findFirst({
      where: {
        id: {
          equals: Number(placeId),
        },
      },
    });
  };

  database.session.create({
    id: 'session-id',
    place: databasePlace(placeId)!,
    user: database.user.create(),
  });
};

/**
 * Method: GET
 */
const getPlace = http.get(api, ({ request }) => {
  const url = new URL(request.url);
  const placeId = url.searchParams.get('id');
  placeId !== '0' && select(placeId);
  return HttpResponse.json(outGetId(placeId));
});

/**
 * Method: LIST
 */
const listPlaces = http.patch(api, () => {
  const outList = {
    success: 1,
    places_item_list: database.place.getAll(),
  };
  return HttpResponse.json(outList);
});

/**
 * Method: POST
 */
const postPlaces = http.post(api, () => {
  database.place.create({
    type: database.type.create(),
  });
  return HttpResponse.json(outGetId('1'));
});

/**
 * Method: PUT
 */
const putPlaces = http.put(api, () => {
  return HttpResponse.json(outGetId('1'));
});

/**
 * Method: DELETE
 */
const deletePlace = http.delete(api, ({ request }) => {
  const url = new URL(request.url);
  const placeId = url.searchParams.get('id');

  const delPlace = database.place.delete({
    where: {
      id: {
        equals: Number(placeId),
      },
    },
  });

  return HttpResponse.json({ success: 1, places_item1: delPlace });
});

export const httpPlaces = [getPlace, postPlaces, putPlaces, listPlaces, deletePlace];
