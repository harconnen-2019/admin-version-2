import { TitlePage } from '@/shared/ui';
import { FormPlaceUpdate } from '@/widgets/place/forms';

/**
 * Страница редактирования витрины
 * @returns страница
 */
export function PlaceEditPage() {
  return (
    <>
      <TitlePage>Редактировать витрину</TitlePage>
      <FormPlaceUpdate />
    </>
  );
}
