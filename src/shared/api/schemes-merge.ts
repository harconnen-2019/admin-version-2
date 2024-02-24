import { z } from 'zod';

/**
 * Параметры удачного - неудачного ответа сервера
 */
export const schemeValidate = z.object({
  success: z.number(),
  err_mess: z.string().optional(),
  err_code: z.number().optional(),
});

/**
 * Список приходящий параметров, помимо основной части
 */
export const schemeParameters = z.object({
  // total - всего записей в списке (приходит только если есть массив со списком)
  params: z.object({ total: z.number().optional() }).optional(),
});

/**
 * У каждого элемента всегда есть дата создания и изменения
 */
export const schemeDate = z.object({
  // @format ISO 8601 UTC
  created: z.coerce.date(),
  modified: z.coerce.date(),
});

/**
 * Передаваемые параметры в адресной строке query string
 */
export const schemeRequestParameters = z.record(z.string(), z.string());
export type IRequestParameters = z.infer<typeof schemeRequestParameters>;
