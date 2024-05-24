import { Center, Loader } from '@mantine/core';

/**
 * Большой спиннер для показа загрузки всей страницы
 * Отображается по центру
 * @returns JSX Element
 */
export function SpinnerPage() {
  return (
    <Center h="30Vh">
      <Loader size={50} />
    </Center>
  );
}
