import { TitlePage } from '@/shared/ui';
import { FormPlaceCreate } from '@/widgets/place/forms';

/**
 * Страница добавления новой витрины
 * @returns страница
 */
export function PlaceCreatePage() {
  return (
    <>
      <TitlePage>Новая витрина</TitlePage>
      <FormPlaceCreate />
    </>
  );
}
