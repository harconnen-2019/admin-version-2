import { DateSchema, ValidateSchema } from '@/shared/api';
import { z } from 'zod';

/**
 * Схема Типа витрины
 * Добавляем зарезервированные поля с датами
 */
const TypeFromPlaceDtoSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
  })
  .merge(DateSchema);

/**
 * Схема ответа для одного Типа витрины с подключенной валидацией
 * Также применяется в ответах api при добавлении и редактировании
 */
const TypeFromPlaceResponseSchema = z
  .object({
    places_type: z.optional(TypeFromPlaceDtoSchema),
  })
  .merge(ValidateSchema);

/**
 * Схема ответа для Списка типов с подключенной валидацией
 */
const TypeFromPlaceListResponseSchema = z
  .object({
    places_type_list: z.optional(z.array(TypeFromPlaceDtoSchema)),
  })
  .merge(ValidateSchema);

// Схема Типа после преобразования
const TypeFromPlaceSchema = TypeFromPlaceDtoSchema;

// Схема Списка типов после преобразования
const TypeFromPlaceListSchema = z.array(TypeFromPlaceSchema);

export const typeFromPlaceContracts = {
  TypeFromPlaceDtoSchema,
  TypeFromPlaceResponseSchema,
  TypeFromPlaceListResponseSchema,
  TypeFromPlaceSchema,
  TypeFromPlaceListSchema,
};
