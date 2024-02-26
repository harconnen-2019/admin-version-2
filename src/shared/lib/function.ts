import { DEBUG, DEFAULT_PAGE_LIMIT } from './setting';

/**
 * Смещение получения записей от номера текущей страницы
 * @param page номер страницы
 * @param limit лимит записей на стр. по умолчанию DEFAULT_PAGE_LIMIT
 * @returns номер со смещением записей от начала
 */
export function getOffset(page: number, limit: number = DEFAULT_PAGE_LIMIT) {
  return page === 1 ? 0 : (page - 1) * limit;
}

/**
 * Получение общего количества страниц
 * @param number_ общее количество записей
 * @param [limit] лимит записей на стр. по умолчанию DEFAULT_PAGE_LIMIT
 * @returns количество страниц
 */
export function getCountPages(number_: number | undefined, limit: number = DEFAULT_PAGE_LIMIT) {
  return Math.ceil(Number(number_) / limit) || 1;
}

/**
 * Форматирование даты в удобный формат
 * @param string_ дата в формате "2022-10-14T12:23:36.764855Z"
 * @returns Дата на русском "14 октября 22 г."
 */
export function getData(string_: Date): string {
  return new Date(string_).toLocaleString('ru', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Изменение размера картинки
 * В DEV режиме подставляет домен сервера для просмотра картинки
 * @param url путь к картинке
 * @param w ширина
 * @param h высота
 * @returns URL
 */
export function getSizeImage(url: string, w: number, h: number): string {
  return `${DEBUG ? import.meta.env.VITE_APP_IMG : ''}/preview/c${String(w)}x${String(h)}${url}`;
}

/**
 * Генерация из строки slug
 * @param word вводимое строка
 * @returns slug от вводимой строки
 */
export function getSlug(word: string): string {
  const currentWord = word.toLowerCase();
  const converter: Map<string, string> = new Map([
    ['а', 'a'],
    ['б', 'b'],
    ['в', 'v'],
    ['г', 'g'],
    ['д', 'd'],
    ['е', 'e'],
    ['ё', 'e'],
    ['ж', 'zh'],
    ['з', 'z'],
    ['и', 'i'],
    ['й', 'y'],
    ['к', 'k'],
    ['л', 'l'],
    ['м', 'm'],
    ['н', 'n'],
    ['о', 'o'],
    ['п', 'p'],
    ['р', 'r'],
    ['с', 's'],
    ['т', 't'],
    ['у', 'u'],
    ['ф', 'f'],
    ['х', 'h'],
    ['ц', 'c'],
    ['ч', 'ch'],
    ['ш', 'sh'],
    ['щ', 'sch'],
    ['ь', ''],
    ['ы', 'y'],
    ['ъ', ''],
    ['э', 'e'],
    ['ю', 'yu'],
    ['я', 'ya'],
    [' ', '-'],
  ]);
  const { length } = word;
  const result: string[] = [];
  for (let index = 0; index < length; index += 1) {
    converter.get(currentWord[index]) === undefined
      ? result.push(currentWord[index])
      : result.push(`${converter.get(currentWord[index])}`);
  }
  return result.join('');
}

/**
 * Для вывода на экран названия тега (на русском или английском)
 * Русский обязателен, но на всякий случай если не найден показываем 'какой-то тег'
 * @returns название тега в русской локали
 */
export function getNameTag(values: { [key: string]: string | number }) {
  return values?.ru || values?.en || 'какой-то тег';
}

/**
 * Генерация случайного числа
 * @param min минимальное значение
 * @param max максимальное значение
 * @returns число
 */
export function getRandom(min: number, max: number) {
  if (min >= max) {
    throw new Error('Неверный ввод: min должно быть меньше max');
  }
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Преобразование объекта в формат FormData
 * @param state исходный объект
 * @returns FormData
 */
export function getFormDate(state: { [x: string]: string | number | null | Blob }) {
  const result = new FormData();
  for (const string_ of Object.keys(state)) {
    state[string_] && result.append(string_, String(state[string_]));
  }
  return result;
}
