import { DEBUG } from './api.constant';

/**
 * Формируем путь к api
 * @param path строка
 * @returns полный путь
 */
export function baseUrl(path: string) {
  return `${DEBUG ? 'http://localhost:3003' : ''}/api/red${path}`;
}

/**
 * Выбирает метод в зависимости от среды
 * @returns PATCH | LIST
 */
export function methodList() {
  return DEBUG ? 'PATCH' : 'LIST';
}

/**
 * Задержка в режиме отладки для старта локального сервера
 * Первый запрос происходит раньше, чем запускается msw сервер
 * @param ms миллисекунды
 * @returns задержка
 */
export function sleepDebug(ms: number = 500) {
  return DEBUG ? new Promise((resolve) => setTimeout(resolve, ms)) : undefined;
}
