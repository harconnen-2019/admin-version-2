import { defaultValidate } from '@/shared/lib';
import { CreateLanguage, Language, UpdateLanguage } from './language.types';

/**
 * Методы для инициализации форм создания и редактирования
 */

const initial: CreateLanguage | UpdateLanguage = {
  name: '',
  slug: '',
};

// Поля будут проверятся на заполнение (обязательные)
const languageFormValidate = {
  name: defaultValidate,
  slug: defaultValidate,
};

// Создание
const languageInitialCreate = (): CreateLanguage => {
  return initial;
};

// Редактирование, id проверяется на странице
const languageInitialUpdate = (id: string): UpdateLanguage => {
  const result = { ...(initial as UpdateLanguage) };
  result.id = Number(id);

  return result;
};

// Загрузка данных с сервера
const languageLoadFromApi = (api: Language) => {
  const result = { ...(initial as UpdateLanguage) };
  for (const key in result) {
    result[key as keyof UpdateLanguage] = api[key as keyof Language] as never;
  }
  return result;
};

export const languageInitial = {
  languageFormValidate,
  languageInitialCreate,
  languageInitialUpdate,
  languageLoadFromApi,
};
