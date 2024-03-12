import { ElementType, Suspense } from 'react';
import { SpinnerPage } from './spinner-page';

/**
 * Показывает спиннер пока загружается скрипт страницы
 * @param Component JSX Element
 * @returns JSX Element
 */
export function Loadable(Component: ElementType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function function_(properties: any) {
    return (
      <Suspense fallback={<SpinnerPage />}>
        <Component {...properties} />
      </Suspense>
    );
  };
}
