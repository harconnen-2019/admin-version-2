import { useForm } from '@mantine/form';

import {
  FormPlace,
  placeFormValidate,
  placeInitialPost,
  placeType,
  useCreatePlace,
} from '@/entities/places';
import { objectToFormDate } from '@/shared/lib';
import { ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';

/**
 * Страница добавления новой витрины
 * @returns страница
 */
export default function PlaceCreatePage() {
  const createPlace = useCreatePlace();

  /**
   * Инициализация состояния формы добавления
   * Указание полей для валидации
   */
  const form = useForm<placeType.IRequestPostPlace>({
    initialValues: placeInitialPost(),
    validate: placeFormValidate,
  });

  return (
    <>
      <TitlePage>Новая витрина</TitlePage>
      <form onSubmit={form.onSubmit((values) => createPlace.mutate(objectToFormDate(values)))}>
        <FormPlace form={form} />
        {
          // Ошибка отправки формы
          createPlace.isError && (
            <ErrorMessage error={createPlace.error}>Форма не отправлена</ErrorMessage>
          )
        }
        <GroupButtonForm disabled={createPlace.isPending} />
      </form>
    </>
  );
}
