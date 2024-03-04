import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/shared/lib';
import { database } from '../database/database';

const api = `${BASE_URL}/places/type/`;

const getPlacesTypesList = http.patch(api, () => {
  const out = {
    success: 1,
    places_type_list: database.type.getAll(),
  };
  return HttpResponse.json(out);
});

export const httpPlacesType = [getPlacesTypesList];
