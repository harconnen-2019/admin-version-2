import { z } from 'zod';

import { typeFromPlacesType } from '@/entities/types-from-places';
import { schemaDate, schemaValidate } from '@/shared/api';

/**
 * Схема элемента витрины
 * Поле 'type' является элементом другой схемы
 * Добавляем зарезервированные поля с датами
 */
export const schemaPlace = z
  .object({
    id: z.number(),
    name: z.string(),
    domain: z.string(),
    template: z.string(),
    type: typeFromPlacesType.schemaTypeFromPlaces,
    favicon: z.string().nullable(),
    og_img: z.string().nullable(),
    logo_light: z.string().nullable(),
    logo_dark: z.string().nullable(),
    color_scheme: z.string().nullable(),
    counter_head: z.string(),
    counter_body: z.string(),
    thankyou_type: z.enum(['', 'pop', 'page', 'off']),
  })
  .merge(schemaDate);

/**
 * Схема получения данных api для вывода одной витрины с подключенной валидацией
 * Также применяется при получения данных api, при добавлении и редактировании
 */
export const schemaGetPlace = z
  .object({
    places_item: schemaPlace.optional(),
  })
  .merge(schemaValidate);

/**
 * Схема получения данных api для вывода списка витрин с подключенной валидацией
 */
export const schemaListPlace = z
  .object({
    places_item_list: z.array(schemaPlace).optional(),
  })
  .merge(schemaValidate);

/**
 * Схема отправки данных api для добавления новой витрины
 * Удаляем поля, которые не применяются
 * Переопределяем тип некоторых полей
 */
const schemaRequestPostPlace = schemaPlace
  .omit({
    created: true,
    modified: true,
    id: true,
  })
  .extend({
    favicon: z.union([z.string(), z.instanceof(File)]).optional(),
    og_img: z.union([z.string(), z.instanceof(File)]).optional(),
    logo_light: z.union([z.string(), z.instanceof(File)]).optional(),
    logo_dark: z.union([z.string(), z.instanceof(File)]).optional(),
    type: z.number(),
  });

/**
 * Схема отправки api для редактирования витрины
 * Это копия схемы добавления + добавлен id редактируемой витрины
 */
const schemaRequestPutPlace = schemaRequestPostPlace.extend({
  id: z.number(),
});

/**
 * Экспортируемые типы
 */

export type IPlace = z.infer<typeof schemaPlace>;
export type IRequestPostPlace = z.infer<typeof schemaRequestPostPlace>;
export type IRequestPutPlace = z.infer<typeof schemaRequestPutPlace>;
