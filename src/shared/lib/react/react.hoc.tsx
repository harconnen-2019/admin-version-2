import { FC, Suspense, SuspenseProps } from 'react';

/**
 * Возвращает функцию WrapperComponent с загрузчиком
 * @param WrappedComponent Дочерний компонент
 * @param suspenseProperties { fallback: <Loader />}
 * @returns JSX Object
 */
export function withSuspense<WrappedProperties extends object>(
  WrappedComponent: FC<WrappedProperties>,
  suspenseProperties: SuspenseProps,
): FC<WrappedProperties> {
  /**
   * WrapperComponent
   * @param properties suspenseProperties
   * @returns JSX Object
   */
  function WrapperComponent(properties: Readonly<WrappedProperties>) {
    return (
      <Suspense {...suspenseProperties}>
        <WrappedComponent {...properties} />
      </Suspense>
    );
  }
  return WrapperComponent;
}
