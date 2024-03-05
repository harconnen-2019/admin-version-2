import { schemaDate, schemaValidate } from '@/shared/api';
import { z } from 'zod';

/**
 * Схема элемента Языка
 * Добавляем зарезервированные поля с датами
 */
export const schemaLanguage = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })
  .merge(schemaDate);

/**
 * Схема получения API для вывода одного языка с подключенной валидацией
 * Также применяется при получении API при добавлении и редактировании
 */
export const schemaGetLanguage = z
  .object({
    thesaurus_language: schemaLanguage.optional(),
  })
  .merge(schemaValidate);

/**
 * Схема получения API для вывода списка языков с подключенной валидацией
 */
export const schemaListLanguage = z
  .object({
    thesaurus_language_list: z.array(schemaLanguage).optional(),
  })
  .merge(schemaValidate);

/**
 * Схема отправки данных api для добавления нового языка
 * Удаляем поля, которые не применяются
 * Переопределяем тип некоторых полей
 */
const schemaRequestPostLanguage = schemaLanguage.omit({
  created: true,
  modified: true,
  id: true,
});

/**
 * Схема отправки api для редактирования языка
 * Это копия схемы добавления + добавлен id редактируемого языка
 */
const schemaRequestPutLanguage = schemaRequestPostLanguage.extend({
  id: z.number(),
});

/**
 * Экспортируемые типы
 */

export type ILanguage = z.infer<typeof schemaLanguage>;
export type IRequestPostLanguage = z.infer<typeof schemaRequestPostLanguage>;
export type IRequestPutLanguage = z.infer<typeof schemaRequestPutLanguage>;
