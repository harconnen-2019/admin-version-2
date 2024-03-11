import { Language, LanguageList, LanguageListResponse, LanguageResponse } from './language.types';

/**
 * Обработка полученных данных, и преобразование в удобный формат языка
 * @param languageResponse ответ сервера
 * @returns Language
 */
function queryResponse(languageResponse: LanguageResponse): Language {
  return {
    ...languageResponse.thesaurus_language!,
  };
}

/**
 * Обработка полученных данных, и преобразование в удобный формат списка языков
 * @param languageListResponse ответ сервера
 * @returns LanguageList
 */
function listResponse(languageListResponse: LanguageListResponse): LanguageList {
  const result = languageListResponse.thesaurus_language_list ?? [];
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

export const languageMap = { queryResponse, listResponse };
