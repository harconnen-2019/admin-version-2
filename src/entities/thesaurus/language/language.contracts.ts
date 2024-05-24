import { DateSchema, ValidateSchema } from '@/shared/api';
import { z } from 'zod';

/**
 * Схема ответа языка
 * Добавляем зарезервированные поля с датами
 */
const LanguageDtoSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
    slug: z.string(),
  })
  .merge(DateSchema);

/**
 * Схема ответа одного языка с подключенной валидацией
 * Также применяется в ответах api при добавлении и редактировании
 */
const LanguageResponseSchema = z
  .object({
    thesaurus_language: z.optional(LanguageDtoSchema),
  })
  .merge(ValidateSchema);

/**
 * Схема query параметров для запроса языка по id
 */
const LanguageQueryDtoSchema = z.object({
  id: z.string(),
});

/**
 * Схема параметра из ответа useParams() роутера
 */
const LanguageParametersDtoSchema = z.object({
  langId: z.string(),
});

/**
 * Схема ответа для списка языков с подключенной валидацией
 */
const LanguageListResponseSchema = z
  .object({
    thesaurus_language_list: z.optional(z.array(LanguageDtoSchema)),
  })
  .merge(ValidateSchema);

/**
 * Схема запроса для добавления нового языка
 * Удаляем поля, которые не применяются
 * Переопределяем тип некоторых полей
 */
const LanguageRequestPostSchema = LanguageDtoSchema.omit({
  created: true,
  modified: true,
  id: true,
});

/**
 * Схема запроса для редактирования языка
 * Это копия схемы добавления + добавлен id редактируемого языка
 */
const LanguageRequestPutSchema = LanguageRequestPostSchema.extend({
  id: z.number().positive(),
});

// Схема Языка после преобразования
const LanguageSchema = LanguageDtoSchema;

// Схема Списка языков после преобразования
const LanguageListSchema = z.array(LanguageSchema);

export const languageContracts = {
  LanguageDtoSchema,
  LanguageResponseSchema,
  LanguageQueryDtoSchema,
  LanguageParametersDtoSchema,
  LanguageListResponseSchema,
  LanguageRequestPostSchema,
  LanguageRequestPutSchema,
  LanguageSchema,
  LanguageListSchema,
};
