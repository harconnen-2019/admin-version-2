import { z } from 'zod';

import { DateSchema, ValidateSchema } from '@/shared/api';

import { typeFromPlaceContracts } from '../type-from-place';

/**
 * Схема ответа витрины
 * Поле 'type' является элементом другой схемы
 * Добавляем зарезервированные поля с датами
 */
const PlaceDtoSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
    domain: z.string(),
    template: z.string(),
    type: typeFromPlaceContracts.TypeFromPlaceDtoSchema,
    favicon: z.nullable(z.string()),
    og_img: z.nullable(z.string()),
    logo_light: z.nullable(z.string()),
    logo_dark: z.nullable(z.string()),
    color_scheme: z.nullable(z.string()),
    counter_head: z.string(),
    counter_body: z.string(),
    thankyou_type: z.enum(['', 'pop', 'page', 'off']),
  })
  .merge(DateSchema);

/**
 * Схема ответа для вывода одной витрины с подключенной валидацией
 * Также применяется в ответах api при добавлении и редактировании
 */
const PlaceResponseSchema = z
  .object({
    places_item: z.optional(PlaceDtoSchema),
  })
  .merge(ValidateSchema);

/**
 * Схема query параметров для запроса витрины по id
 */
const PlaceQueryDtoSchema = z.object({
  id: z.string(),
});

/**
 * Схема query параметров для выбора витрины активной по id
 */
const PlaceSelectQueryDtoSchema = z.object({
  id: z.union([z.string(), z.number()]),
  select: z.number().min(1).max(1),
});

/**
 * Схема параметра из ответа useParams() роутера
 */
const PlaceParametersDtoSchema = z.object({
  placeId: z.string(),
});

/**
 * Схема ответа для списка витрин с подключенной валидацией
 */
const PlaceListResponseSchema = z
  .object({
    places_item_list: z.optional(z.array(PlaceDtoSchema)),
  })
  .merge(ValidateSchema);

/**
 * Схема запроса для добавления новой витрины
 * Удаляем поля, которые не применяются
 * Переопределяем тип некоторых полей (картинки в ответе string, в запросе File)
 */
const PlaceRequestPostSchema = PlaceDtoSchema.omit({
  created: true,
  modified: true,
  id: true,
}).extend({
  favicon: z.optional(z.union([z.string(), z.instanceof(File)])),
  og_img: z.optional(z.union([z.string(), z.instanceof(File)])),
  logo_light: z.optional(z.union([z.string(), z.instanceof(File)])),
  logo_dark: z.optional(z.union([z.string(), z.instanceof(File)])),
  type: z.number().positive(),
});

/**
 * Схема отправки для редактирования витрины
 * Это копия схемы добавления + добавлен id редактируемой витрины
 */
const PlaceRequestPutSchema = PlaceRequestPostSchema.extend({
  id: z.number().positive(),
});

// Схема Витрины после преобразования
const PlaceSchema = PlaceDtoSchema;

// Схема Списка витрин после преобразования
const PlaceListSchema = z.array(PlaceSchema);

export const placeContracts = {
  PlaceDtoSchema,
  PlaceResponseSchema,
  PlaceQueryDtoSchema,
  PlaceSelectQueryDtoSchema,
  PlaceParametersDtoSchema,
  PlaceListResponseSchema,
  PlaceRequestPostSchema,
  PlaceRequestPutSchema,
  PlaceSchema,
  PlaceListSchema,
};
