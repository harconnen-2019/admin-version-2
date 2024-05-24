import { defaultValidate } from '@/shared/lib';
import { CreatePlace, Place, UpdatePlace } from './place.types';

/**
 * Методы для инициализации форм создания и редактирования
 */

const initial: CreatePlace | UpdatePlace = {
  name: '',
  domain: '',
  type: 0,
  template: '',
  color_scheme: 'default',
  favicon: undefined,
  og_img: undefined,
  logo_light: undefined,
  logo_dark: undefined,
  counter_head: '',
  counter_body: '',
  thankyou_type: '',
};

// Поля будут проверятся на заполнение (обязательные)
const placeFormValidate = {
  type: defaultValidate,
  name: defaultValidate,
  domain: defaultValidate,
  template: defaultValidate,
};

// Создание
const placeInitialCreate = (): CreatePlace => {
  return initial;
};

// Редактирование, id проверяется на странице
const placeInitialUpdate = (id: string): UpdatePlace => {
  const result = { ...(initial as UpdatePlace) };
  result.id = Number(id);

  return result;
};

// Загрузка данных с сервера
const placeLoadFromApi = (api: Place) => {
  const result = { ...(initial as UpdatePlace) };
  for (const key in result) {
    result[key as keyof UpdatePlace] = api[key as keyof Place] as never;
  }
  return result;
};

export const placeInitial = {
  placeFormValidate,
  placeInitialCreate,
  placeInitialUpdate,
  placeLoadFromApi,
};
