import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/shared/lib';
import { database } from '../../database/database';

const api = `${BASE_URL}/thesaurus/language/`;

const outGetId = (id: string | null) => {
  if (id === '0')
    return {
      success: 0,
      err_mess: 'Ошибка для теста',
      err_code: '505',
    };

  return {
    success: 1,
    thesaurus_language: database.language.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    }),
  };
};

/**
 * Method: GET
 */
const getLanguage = http.get(api, ({ request }) => {
  const url = new URL(request.url);
  const languageId = url.searchParams.get('id');

  return HttpResponse.json(outGetId(languageId));
});

/**
 * Method: LIST
 */
const getLanguagesList = http.patch(api, () => {
  const out = {
    success: 1,
    thesaurus_language_list: database.language.getAll(),
  };
  return HttpResponse.json(out);
});

/**
 * Method: POST
 */
const postLanguages = http.post(api, () => {
  database.language.create();
  return HttpResponse.json(outGetId('1'));
});

/**
 * Method: PUT
 */
const putLanguages = http.put(api, () => {
  return HttpResponse.json(outGetId('1'));
});

/**
 * Method: DELETE
 */
const deleteLanguages = http.delete(api, ({ request }) => {
  const url = new URL(request.url);
  const languageId = url.searchParams.get('id');

  const delPlace = database.language.delete({
    where: {
      id: {
        equals: Number(languageId),
      },
    },
  });

  return HttpResponse.json({ success: 1, places_item1: delPlace });
});

export const httpLanguages = [
  getLanguage,
  getLanguagesList,
  postLanguages,
  putLanguages,
  deleteLanguages,
];
