import { defaultValidate } from '@/shared/lib';

import { IPlace, IRequestPostPlace, IRequestPutPlace } from './types';

/**
 * Методы для инициализации форм создания и редактирования
 */

const initial: IRequestPostPlace | IRequestPutPlace = {
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

// какие поля будут проверятся на заполнение (обязательные)
export const placeFormValidate = {
  type: defaultValidate,
  name: defaultValidate,
  domain: defaultValidate,
  template: defaultValidate,
};

// создание
export const placeInitialPost = (): IRequestPostPlace => {
  return initial;
};

// редактирование, id проверяется на странице
export const placeInitialPut = (id: string | number): IRequestPutPlace => {
  const result = { ...(initial as IRequestPutPlace) };
  result.id = Number(id);

  return result;
};

// присвоение данных при загрузки с сервера
export const placeLoadFromApi = (api: IPlace) => {
  const result = { ...(initial as IRequestPutPlace) };
  for (const key in result) {
    if (key === 'type') {
      result['type'] = api['type'].id;
    } else {
      result[key as keyof IRequestPutPlace] = api[key as keyof IPlace] as never;
    }
  }
  return result;
};
