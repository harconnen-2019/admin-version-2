import { useForm } from '@mantine/form';

import { FormPlaceAdd, placeType, useCreatePlace } from '@/entities/places';
import { defaultValidate, objectToFormDate } from '@/shared/lib';
import { ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';

/**
 * Страница добавления новой витрины
 * @returns форма добавления витрины
 */
export default function PlaceCreatePage() {
  const createPlace = useCreatePlace();

  const form = useForm<placeType.IRequestPostPlace>({
    initialValues: {
      name: '',
      domain: '',
      type: 0,
      template: '',
      color_scheme: 'default',
      favicon: undefined,
      og_img: undefined,
      logo_light: undefined,
      logo_dark: undefined,
      counter_head: '',
      counter_body: '',
      thankyou_type: '',
    },

    validate: {
      type: defaultValidate,
      name: defaultValidate,
      domain: defaultValidate,
      template: defaultValidate,
    },
  });

  return (
    <>
      <TitlePage>Новая витрина</TitlePage>
      <form
        onSubmit={form.onSubmit((values) => {
          return createPlace.mutate(objectToFormDate(values));
        })}
      >
        <FormPlaceAdd form={form} />
        {createPlace.isError && (
          <ErrorMessage error={createPlace.error}>Форма не отправлена</ErrorMessage>
        )}
        <GroupButtonForm disabled={createPlace.isPending} />
      </form>
    </>
  );
}
