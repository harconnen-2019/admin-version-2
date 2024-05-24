import { HttpResponse, delay, http } from 'msw';

import { typeFromPlaceApi } from '@/entities/type-from-place';
import { database } from '../database/database';

const api = typeFromPlaceApi.api;

const list = http.patch(api, async () => {
  const result = {
    success: 1,
    places_type_list: database.type.getAll(),
  };
  await delay();
  return HttpResponse.json(result);
});

export const httpPlacesType = [list];
