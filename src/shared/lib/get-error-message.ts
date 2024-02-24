/**
 * Обработка ошибки typescript для try/catch
 * https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */

type ErrorWithMessage = {
  message: string;
};

/**
 * Проверка типа входящей ошибки
 * @param error текущая ошибка
 * @returns true если это ошибка тип Error
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * Если получаемая ошибка является строкой, преобразуем ее в ошибку типа Error
 * @param maybeError входящее значение для проверки
 * @returns ошибка тип Error
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) {
    return maybeError;
  }

  const errorMessage = typeof maybeError === 'string' ? maybeError : String(maybeError);
  return new Error(errorMessage);
}

/**
 *  Вывод ошибки в catch(), чтобы typescript не ругался на newer
 * @param error ошибка которую возвращает catch()
 * @returns строка с текстом ошибки
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
