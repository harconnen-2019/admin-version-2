import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/shared/lib';
import { database } from '../../database/database';

const api = `${BASE_URL}/thesaurus/language/`;

const getLanguagesList = http.patch(api, () => {
  const out = {
    success: 1,
    thesaurus_language_list: database.language.getAll(),
  };
  return HttpResponse.json(out);
});

export const httpLanguages = [getLanguagesList];
