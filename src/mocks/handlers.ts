import { http } from 'msw';
import { httpAuth } from './api/auth';
import { httpPlaces } from './api/places';
import { httpPlacesType } from './api/places-types';

export const handlers = [
  ...httpAuth,
  ...httpPlaces,
  ...httpPlacesType,
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
