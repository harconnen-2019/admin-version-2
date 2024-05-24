import { Box, Skeleton } from '@mantine/core';

/**
 * Большой спиннер для показа загрузки всей страницы
 * Отображается по центру
 * @returns JSX Element
 */
export function SpinnerData() {
  return (
    <Box>
      <>
        {/* <Skeleton height={50} circle mb="xl" /> */}
        <Skeleton height={16} mt={80} radius="md" />
        <Skeleton height={16} mt={30} radius="md" />
        <Skeleton height={16} mt={30} radius="md" />
        <Skeleton height={16} mt={30} radius="md" />
        <Skeleton height={16} mt={30} width={'70%'} radius="md" />
      </>
    </Box>
  );
}
