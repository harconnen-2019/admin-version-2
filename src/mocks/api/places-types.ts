import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';

const api = `${BASE_URL}/places/type/`;

const list = {
  success: 1,
  places_type_list: [
    {
      id: 1,
      created: '2023-08-16T14:32:47.160691Z',
      modified: '2023-08-16T14:32:47.160714Z',
      name: 'site',
    },
    {
      id: 2,
      created: '2023-08-16T14:32:47.160691Z',
      modified: '2023-08-16T14:32:47.160714Z',
      name: 'site-test',
    },
  ],
};

const getPlacesTypesList = http.patch(api, () => {
  return HttpResponse.json(list);
});

export const httpPlacesType = [getPlacesTypesList];
