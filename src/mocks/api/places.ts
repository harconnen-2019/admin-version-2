/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../../shared/lib';

const url = 'https://admin.rstream.tech';
const api = `${BASE_URL}/places/item/`;

const list = {
  success: 1,
  places_item_list: [
    {
      id: 3,
      created: '2023-11-10T11:43:17.678491Z',
      modified: '2023-11-10T11:43:17.678516Z',
      name: 'maombi.com',
      domain: 'maombi.com',
      template: 'maombi',
      type: {
        id: 1,
        created: '2023-08-16T14:32:47.160691Z',
        modified: '2023-08-16T14:32:47.160714Z',
        name: 'site',
      },
      seo_title_json: {},
      seo_description_json: {},
      about: 'TODO',
      tac: 'TODO',
      pp: 'TODO',
      dmca: 'TODO',
      favicon: null,
      og_img: null,
      logo_dark: null,
      logo_light: null,
      color_scheme: null,
      counter_head: '',
      counter_body: '',
      thankyou_type: '',
    },
    {
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
      seo_title_json: { en: 'Maombi title', ru: 'Maombi заголовок' },
      seo_description_json: { en: 'note', ru: 'описание' },
      about: '<h1>About</h1>',
      tac: '<h1>Terms And Conditions</h1>',
      pp: '<h1>Privacy Policy</h1>',
      dmca: '<h1> DMCA </h1>',
      favicon: '/storage/place/favicon/2023/12/01/Screenshot_from_2023-10-13_13-36-55.png',
      og_img: '/storage/place/og/2023/12/01/Screenshot_from_2023-10-04_18-32-45.png',
      logo_dark: '/storage/place/dl/2024/01/16/logo_1.png',
      logo_light: '/storage/place/ll/2024/01/16/logo_1.png',
      color_scheme: 'default',
      counter_head: '<!-- -->',
      counter_body: '<!-- -->',
      thankyou_type: 'pop',
    },
    {
      id: 1,
      created: '2023-08-20T12:21:14.062650Z',
      modified: '2023-12-01T09:12:03.133301Z',
      name: 'small-game.com',
      domain: 'site2.com',
      template: 'base',
      type: {
        id: 1,
        created: '2023-08-16T14:32:47.160691Z',
        modified: '2023-08-16T14:32:47.160714Z',
        name: 'site',
      },
      seo_title_json: { en: 'Games title', ru: 'Игры заголовок' },
      seo_description_json: { en: 'note', ru: 'описание' },
      about: 'About',
      tac: 'Terms And Conditions:',
      pp: 'Privacy Policy:',
      dmca: 'DMCA:',
      favicon: null,
      og_img: null,
      logo_dark: null,
      logo_light: null,
      color_scheme: null,
      counter_head: '<!-- -->',
      counter_body: '<!-- -->',
      thankyou_type: '',
    },
  ],
};

const get = {
  success: 1,
  places_item: {
    id: 3,
    created: '2023-11-10T11:43:17.678491Z',
    modified: '2023-11-10T11:43:17.678516Z',
    name: 'maombi.com',
    domain: 'maombi.com',
    template: 'maombi',
    type: {
      id: 1,
      created: '2023-08-16T14:32:47.160691Z',
      modified: '2023-08-16T14:32:47.160714Z',
      name: 'site',
    },
    seo_title_json: {},
    seo_description_json: {},
    about: 'TODO',
    tac: 'TODO',
    pp: 'TODO',
    dmca: 'TODO',
    favicon: null,
    og_img: `${url}/storage/place/og/2023/12/01/Screenshot_from_2023-10-04_18-32-45.png`,
    logo_dark: null,
    logo_light: null,
    color_scheme: null,
    counter_head: '',
    counter_body: '',
    thankyou_type: '',
  },
};

const getPlace = http.get(api, () => {
  return HttpResponse.json(get);
});

const listPlaces = http.patch(api, () => {
  return HttpResponse.json(list);
});

const postPlaces = http.post(api, () => {
  return HttpResponse.json(get);
});

const putPlaces = http.put(api, () => {
  return HttpResponse.json(get);
});

const deletePlace = http.delete(api, () => {
  return HttpResponse.json(get);
});

export const httpPlaces = [getPlace, postPlaces, putPlaces, listPlaces, deletePlace];
