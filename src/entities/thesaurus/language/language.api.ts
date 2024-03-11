import { baseUrl, methodList } from '@/shared/api';
import { createJsonMutation, createJsonQuery } from '@/shared/lib/fetch';
import { zodContract } from '@/shared/lib/zod';

import { languageContracts } from './language.contracts';
import { languageMap } from './language.library';
import { CreateLanguage, LanguageQuery, UpdateLanguage } from './language.types';

const _url = baseUrl('/thesaurus/language/');

/**
 * Получение одного языка
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.query id языка
 * @param signal сигнал отмены
 * @returns запрос
 */
async function query(parameters: { query: LanguageQuery }, signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: _url,
      method: 'GET',
      query: parameters.query,
    },
    response: {
      contract: zodContract(languageContracts.LanguageResponseSchema),
      mapData: languageMap.queryResponse,
    },
    abort: signal,
  });
}

/**
 * Получение списка языков
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
      contract: zodContract(languageContracts.LanguageListResponseSchema),
      mapData: languageMap.listResponse,
    },
    abort: signal,
  });
}

/**
 * Добавление нового языка
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.language новый язык
 * @returns запрос
 */
async function createMutation(parameters: { language: CreateLanguage }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'POST',
      body: JSON.stringify(parameters.language),
    },
    response: {
      contract: zodContract(languageContracts.LanguageResponseSchema),
      mapData: languageMap.queryResponse,
    },
  });
}

/**
 * Обновление языка
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.language новый язык
 * @returns запрос
 */
async function updateMutation(parameters: { language: UpdateLanguage }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'PUT',
      body: JSON.stringify(parameters.language),
    },
    response: {
      contract: zodContract(languageContracts.LanguageResponseSchema),
      mapData: languageMap.queryResponse,
    },
  });
}

/**
 * Удаление языка
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param parameters параметры
 * @param parameters.query id языка
 * @returns запрос
 */
async function removeMutation(parameters: { query: LanguageQuery }) {
  return createJsonMutation({
    request: {
      url: _url,
      method: 'DELETE',
      query: parameters.query,
    },
    response: {
      contract: zodContract(languageContracts.LanguageResponseSchema),
      mapData: languageMap.queryResponse,
    },
  });
}

export const languageApi = {
  api: _url,
  query,
  listQuery,
  createMutation,
  updateMutation,
  removeMutation,
};
