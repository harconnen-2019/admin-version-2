import { ZodType } from 'zod';

export interface Contract<Raw, Data extends Raw> {
  isData: (prepared: Raw) => prepared is Data;
  getErrorMessages: (prepared: Raw) => string[];
}

/**
 * Формирует контракт ZOD
 * Формирует ошибку со списком
 * @param data данные
 * @returns проверка isData, ошибки getErrorMessages
 */
export function zodContract<D>(data: ZodType<D>): Contract<unknown, D> {
  /**
   * Предикат на успешную проверку
   * @param prepared подготовленные данные
   * @returns boolean
   */
  function isData(prepared: unknown): prepared is D {
    return data.safeParse(prepared).success;
  }

  return {
    isData,
    getErrorMessages(raw) {
      const validation = data.safeParse(raw);
      if (validation.success) {
        return [];
      }

      return validation.error.errors.map((error_) => {
        const path = error_.path.join('.');
        return path === '' ? error_.message : `${error_.message}, path: ${path}`;
      });
    },
  };
}
