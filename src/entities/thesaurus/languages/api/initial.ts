import { defaultValidate } from '@/shared/lib';

import { ILanguage, IRequestPostLanguage, IRequestPutLanguage } from './types';

/**
 * Методы для инициализации форм создания и редактирования
 */

const initial: IRequestPostLanguage | IRequestPutLanguage = {
  name: '',
  slug: '',
};

// какие поля будут проверятся на заполнение (обязательные)
export const languageFormValidate = {
  name: defaultValidate,
  slug: defaultValidate,
};

// создание
export const languageInitialPost = (): IRequestPostLanguage => {
  return initial;
};

// редактирование, id проверяется на странице
export const languageInitialPut = (id: string | number): IRequestPutLanguage => {
  const result = { ...(initial as IRequestPutLanguage) };
  result.id = Number(id);

  return result;
};

// присвоение данных при загрузки с сервера
export const languageLoadFromApi = (api: ILanguage) => {
  const result = { ...(initial as IRequestPutLanguage) };
  for (const key in result) {
    result[key as keyof IRequestPutLanguage] = api[key as keyof ILanguage] as never;
  }
  return result;
};
