import { schemaDate, schemaValidate } from '@/shared/api';
import { z } from 'zod';

/**
 * Схема элемента типа витрины
 * Добавляем зарезервированные поля с датами
 */
export const schemaPlacesType = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .merge(schemaDate);

export type IPlacesType = z.infer<typeof schemaPlacesType>;

/**
 * Схема получения API для вывода одного тип витрины с подключенной валидацией
 * Также применяется при получении API при добавлении и редактировании
 */
export const schemaGetPlaceType = z
  .object({
    places_type: schemaPlacesType.optional(),
  })
  .merge(schemaValidate);

/**
 * Схема получения API для вывода списка типов витрин с подключенной валидацией
 */
export const schemaListPlaceType = z
  .object({
    places_type_list: z.array(schemaPlacesType).optional(),
  })
  .merge(schemaValidate);
