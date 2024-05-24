import { baseUrl, methodList } from '@/shared/api';
import { createJsonQuery } from '@/shared/lib/fetch';
import { zodContract } from '@/shared/lib/zod';

import { typeFromPlaceContracts } from './type-from-place.contracts';
import { typeFromPlaceListMap } from './type-from-place.library';

const _url = baseUrl('/places/type/');

/**
 * Получение списка типов для витрин
 * Подключение схемы для проверки полученных данных
 * Callback map... формирует удобный объект из полученных данных
 * @param signal сигнал отмены
 * @returns запрос
 */
async function query(signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: _url,
      method: methodList(),
    },
    response: {
      contract: zodContract(typeFromPlaceContracts.TypeFromPlaceListResponseSchema),
      mapData: typeFromPlaceListMap.listResponse,
    },
    abort: signal,
  });
}

export const typeFromPlaceApi = {
  api: _url,
  query,
};
