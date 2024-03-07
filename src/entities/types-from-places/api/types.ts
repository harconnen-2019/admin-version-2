import { z } from 'zod';

import { schemaDate, schemaValidate } from '@/shared/api';

/**
 * Схема элемента типа витрины
 * Добавляем зарезервированные поля с датами
 */
export const schemaTypeFromPlaces = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .merge(schemaDate);

export type ITypeFromPlaces = z.infer<typeof schemaTypeFromPlaces>;

/**
 * Схема получения API для вывода одного тип витрины с подключенной валидацией
 * Также применяется при получении API при добавлении и редактировании
 */
export const schemaGetTypeFromPlaces = z
  .object({
    places_type: schemaTypeFromPlaces.optional(),
  })
  .merge(schemaValidate);

/**
 * Схема получения API для вывода списка типов витрин с подключенной валидацией
 */
export const schemaListTypeFromPlaces = z
  .object({
    places_type_list: z.array(schemaTypeFromPlaces).optional(),
  })
  .merge(schemaValidate);
