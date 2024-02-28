import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';

const url = 'https://admin.rstream.tech';
const apiSession = `${BASE_URL}/users/session/`;
const apiLogin = `${BASE_URL}/users/login/`;

const get = {
  success: 1,
  session: {
    user: {
      id: 1,
      username: 'admin',
    },
    place: {
      id: 2,
      created: '2023-08-21T17:15:47.456078Z',
      modified: '2024-02-14T16:17:57.547774Z',
      name: 'rstream.tech',
      domain: 'rstream.tech',
      template: 'place-bumblebee',
      type: {
        id: 1,
        created: '2023-08-16T14:32:47.160691Z',
        modified: '2023-08-16T14:32:47.160714Z',
        name: 'site',
      },
      favicon: `${url}/storage/place/favicon/2023/12/01/Screenshot_from_2023-10-13_13-36-55.png`,
      og_img: `${url}/storage/place/og/2023/12/01/Screenshot_from_2023-10-04_18-32-45.png`,
      logo_dark: `${url}/storage/place/dl/2024/01/16/logo_1.png`,
      logo_light: `${url}/storage/place/ll/2024/01/16/logo_1.png`,
      color_scheme: 'default',
      counter_head: '<!-- -->',
      counter_body: '<!-- -->',
      thankyou_type: 'pop',
    },
    id: 'session-id',
  },
};

const getSession = http.get(apiSession, () => {
  return HttpResponse.json(get);
});

const getLogin = http.post(apiLogin, () => {
  return HttpResponse.json(get);
});

export const httpAuth = [getSession, getLogin];
