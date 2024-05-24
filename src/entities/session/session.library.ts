import { Session, SessionResponse } from './session.types';

/**
 * Обработка полученных данных, и преобразование в удобный формат сессии
 * @param sessionResponse ответ сервера
 * @returns Session
 */
export function queryResponse(sessionResponse: SessionResponse): Session {
  return {
    success: sessionResponse.success,
    place: sessionResponse.session?.place,
    user: sessionResponse.session?.user,
  };
}

export const sessionMap = { queryResponse };
