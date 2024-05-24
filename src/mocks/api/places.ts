import { HttpResponse, delay, http } from 'msw';

import { placeApi } from '@/entities/place';
import { database } from '../database/database';

const api = placeApi.api;

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
    places_item: database.place.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    }),
  };
};

/**
 * Метод для проверки  выбора активной витрины
 * Удаляем старую сессию
 * Выбираем витрину по id
 * Создаем новую сессию и прикрепляем выбранную витрину
 * @param placeId id витрины
 */
const select = (placeId: string | null) => {
  database.session.delete({
    where: {
      id: {
        equals: 'session-id',
      },
    },
  });

  const databasePlace = (placeId: string | null) => {
    return database.place.findFirst({
      where: {
        id: {
          equals: Number(placeId),
        },
      },
    });
  };

  database.session.create({
    id: 'session-id',
    place: databasePlace(placeId)!,
    user: database.user.create(),
  });
};

/**
 * Method: GET
 * Получаем id из адреса и выводим элемент
 */
const get = http.get(api, async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') as string;
  /**
   * Если в строке присутствует select, запускаем метод выбора активной витрины
   */
  id !== '0' && select(id);
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
    places_item_list: database.place.getAll(),
  };
  await delay();
  return HttpResponse.json(result, { status: 200 });
});

/**
 * Method: POST
 * Добавляем новую запись в базу
 * Данные отправляем в формате FormData, поэтому просто генерируем новую витрину
 */
const post = http.post(api, async () => {
  database.place.create({
    type: database.type.create(),
  });
  await delay();
  return HttpResponse.json(getId('1'), { status: 201 });
});

/**
 * Method: PUT
 * Изменяем запись в базе - ничего не делаем
 * Данные отправляем в формате FormData
 */
const put = http.put(api, async () => {
  await delay();
  return HttpResponse.json(getId('1'), { status: 201 });
});

/**
 * Method: DELETE
 * Удаляем запись в базе и выводим ее-же в ответе
 */
const remove = http.delete(api, async ({ request }) => {
  const url = new URL(request.url);

  const id = url.searchParams.get('id');

  const result = database.place.delete({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });
  await delay();
  return HttpResponse.json({ success: 1, places_item: result }, { status: 202 });
});

export const httpPlaces = [get, post, put, list, remove];
