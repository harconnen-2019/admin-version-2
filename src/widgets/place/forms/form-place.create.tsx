import { useForm } from '@mantine/form';

import { placeInitial, placeQueries, placeTypes } from '@/entities/place';
import { ErrorHandler, GroupButtonForm } from '@/shared/ui';
import { FormPlace } from './form-place.ui';

/**
 * Добавление новой витрины
 * @returns форма добавления
 */
export function FormPlaceCreate() {
  const { mutate: createPlace, isPending, isError, error } = placeQueries.useCreateMutation();

  /**
   * Инициализация состояния формы добавления
   * Указание полей для валидации
   */
  const form = useForm<placeTypes.CreatePlace>({
    initialValues: placeInitial.placeInitialCreate(),
    validate: placeInitial.placeFormValidate,
  });

  return (
    <form onSubmit={form.onSubmit((values) => createPlace({ place: values }))}>
      <FormPlace form={form} />
      {
        // Ошибка отправки формы
        isError && <ErrorHandler error={error} />
      }
      <GroupButtonForm disabled={isPending} />
    </form>
  );
}
