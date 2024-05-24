import { z } from 'zod';

/**
 * Параметры удачного - неудачного ответа сервера
 * Все ответы планируются со статусом 200, ошибки только внутри ответа
 */
export const ValidateSchema = z.object({
  // Удачно/неудачно завершился запрос к серверу (0 | 1)
  success: z.number().min(0).max(1),
  // Сообщение об ошибке
  err_mess: z.optional(z.string()),
  // Код ошибки
  err_code: z.optional(z.union([z.number().positive(), z.string()])),
});

/**
 * Список приходящий параметров, помимо основной части
 */
export const ParametersSchema = z.object({
  // total - всего записей в списке (приходит только если есть массив со списком)
  params: z.optional(z.object({ total: z.optional(z.number().positive()) })),
});

/**
 * У каждого элемента всегда есть дата создания и изменения
 */
export const DateSchema = z.object({
  // @format ISO 8601 UTC
  created: z.coerce.date(),
  modified: z.coerce.date(),
});

/**
 * Передаваемые параметры в адресной строке query string
 */
export const RequestParametersSchema = z.record(z.string(), z.string());
export type RequestParameters = z.infer<typeof RequestParametersSchema>;
