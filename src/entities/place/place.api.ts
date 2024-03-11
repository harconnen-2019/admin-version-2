import { baseUrl, methodList } from '@/shared/api';
import { objectToFormDate } from '@/shared/lib';
import { createJsonMutation, createJsonQuery } from '@/shared/lib/fetch';
import { zodContract } from '@/shared/lib/zod';

import { placeContracts } from './place.contracts';
import { placeMap } from './place.library';
import { CreatePlace, PlaceQuery, PlaceSelectQuery, UpdatePlace } from './place.types';

const _url = baseUrl('/places/item/');

/**
 * Получение одной витрины
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.query id витрины
 * @param signal сигнал отмены
 * @returns запрос
 */
async function query(parameters: { query: PlaceQuery | PlaceSelectQuery }, signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: _url,
      method: 'GET',
      query: parameters.query,
    },
    response: {
      contract: zodContract(placeContracts.PlaceResponseSchema),
      mapData: placeMap.queryResponse,
    },
    abort: signal,
  });
}

/**
 * Получение списка витрин
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param signal сигнал отмены
 * @returns запрос
 */
async function listQuery(signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: _url,
      method: methodList(),
    },
    response: {
      contract: zodContract(placeContracts.PlaceListResponseSchema),
      mapData: placeMap.listResponse,
    },
    abort: signal,
  });
}

/**
 * Добавление новой витрины
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.place новая витрина
 * @returns запрос
 */
async function createMutation(parameters: { place: CreatePlace }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'POST',
      body: objectToFormDate(parameters.place),
    },
    response: {
      contract: zodContract(placeContracts.PlaceResponseSchema),
      mapData: placeMap.queryResponse,
    },
  });
}

/**
 * Обновление витрины
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.place новая витрина
 * @returns запрос
 */
async function updateMutation(parameters: { place: UpdatePlace }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'PUT',
      body: objectToFormDate(parameters.place),
    },
    response: {
      contract: zodContract(placeContracts.PlaceResponseSchema),
      mapData: placeMap.queryResponse,
    },
  });
}

/**
 * Удаление витрины
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.query id витрины
 * @returns запрос
 */
async function removeMutation(parameters: { query: PlaceQuery }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'DELETE',
      query: parameters.query,
    },
    response: {
      contract: zodContract(placeContracts.PlaceResponseSchema),
      mapData: placeMap.queryResponse,
    },
  });
}

export const placeApi = {
  api: _url,
  query,
  listQuery,
  createMutation,
  updateMutation,
  removeMutation,
};
