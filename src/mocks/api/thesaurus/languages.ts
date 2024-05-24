import { HttpResponse, delay, http } from 'msw';

import { languageApi, languageTypes } from '@/entities/thesaurus/language';
import { database } from '../../database/database';

const api = languageApi.api;

/**
 * Для ответов HttpResponse.json, ищем в базе данные по id
 * Для теста можно создать ошибку если id = 0
 * @param id id
 * @returns Объект с данными
 */
const getId = (id: string | number) => {
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
 * Получаем id из адреса и выводим элемент
 */
const get = http.get(api, async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') as string;
  await delay();
  return HttpResponse.json(getId(id), { status: 200 });
});

/**
 * Method: LIST
 * Выводим список всех записей из базы
 */
const list = http.patch(api, async () => {
  const result = {
    success: 1,
    thesaurus_language_list: database.language.getAll(),
  };
  await delay();
  return HttpResponse.json(result, { status: 200 });
});

/**
 * Method: POST
 * Добавляем новую запись в базу и выводим ее-же в ответе
 */
const post = http.post(api, async ({ request }) => {
  const newLanguage = (await request.json()) as languageTypes.CreateLanguage;
  const result = database.language.create(newLanguage);
  await delay();
  return HttpResponse.json(getId(result.id), { status: 201 });
});

/**
 * Method: PUT
 * Изменяем запись в базе и выводим ее-же в ответе
 */
const put = http.put(api, async ({ request }) => {
  const newLanguage = (await request.json()) as languageTypes.UpdateLanguage;

  database.language.update({
    where: {
      id: {
        equals: newLanguage.id,
      },
    },
    data: {
      name: newLanguage.name,
      slug: newLanguage.slug,
    },
  });

  await delay();
  return HttpResponse.json(getId(newLanguage.id), { status: 201 });
});

/**
 * Method: DELETE
 * Удаляем запись в базе и выводим ее-же в ответе
 */
const remove = http.delete(api, async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const result = database.language.delete({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });
  await delay();
  return HttpResponse.json({ success: 1, thesaurus_language: result }, { status: 202 });
});

export const httpLanguages = [get, list, post, put, remove];
