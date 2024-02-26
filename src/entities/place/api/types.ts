import { schemaDate, schemaValidate } from '@/shared/api';
import { z } from 'zod';

/**
 * Схема элемента витрины
 * Поле type является элементом другой схемы
 * Добавляем зарезервированные поля с датами
 */
export const schemaPlace = z
  .object({
    id: z.number(),
    name: z.string(),
    domain: z.string(),
    template: z.string(),
    // TODO вставить схему type
    type: z.any(),
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

export type IPlace = z.infer<typeof schemaPlace>;

/**
 * Схема получения API для вывода одной витрины с подключенной валидацией
 * Также применяется при получении API при добавлении и редактировании
 */
export const schemaGetPlace = z
  .object({
    places_item: schemaPlace.optional(),
  })
  .merge(schemaValidate);

/**
 * Схема получения API для вывода списка витрин с подключенной валидацией
 */
export const schemaListPlace = z
  .object({
    places_item_list: z.array(schemaPlace).optional(),
  })
  .merge(schemaValidate);

/**
 * Схема отправки API для добавления новой витрины
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
    favicon: z.instanceof(File).optional(),
    og_img: z.instanceof(File).optional(),
    logo_light: z.instanceof(File).optional(),
    logo_dark: z.instanceof(File).optional(),
    type: z.number(),
  });
export type IRequestPostPlace = z.infer<typeof schemaRequestPostPlace>;

/**
 * Схема отправки API для редактирования витрины
 * Это копия схемы добавления + добавлен ID редактируемой витрины
 */
const schemaRequestPutPlace = schemaRequestPostPlace.extend({
  id: z.number(),
});
export type IRequestPutPlace = z.infer<typeof schemaRequestPutPlace>;
