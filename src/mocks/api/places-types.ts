import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/shared/lib';
import { database } from '../database/database';

const api = `${BASE_URL}/places/type/`;

// export const databaseType = database.type.create({ id: 1 });
// database.type.create({ id: 2 });
// database.type.create({ id: 3 });

const out = {
  success: 1,
  places_type_list: database.type.getAll(),
};

const getPlacesTypesList = http.patch(api, () => {
  return HttpResponse.json(out);
});

export const httpPlacesType = [getPlacesTypesList];
