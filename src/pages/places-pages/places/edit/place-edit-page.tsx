import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '@mantine/form';

import { FormPlaceAdd, placeType, useGetPlace, useUpdatePlace } from '@/entities/places';
import { defaultValidate, objectToFormDate, removeImagesIfString } from '@/shared/lib';
import { ErrorMessage, GroupButtonForm, PageLoadingOverlay, TitlePage } from '@/shared/ui';

/**
 * Страница добавления новой витрины
 * @returns форма добавления витрины
 */
export default function PlaceEditPage() {
  const { placeId } = useParams();
  const updatePlace = useUpdatePlace();
  const { data, error, isPending } = useGetPlace(placeId);

  const place = data?.places_item ?? undefined;
  const arrayImagesForm = ['favicon', 'og_img', 'logo_light', 'logo_dark'];

  const form = useForm<placeType.IRequestPutPlace>({
    initialValues: {
      id: Number(placeId!),
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

  useEffect(() => {
    if (!place) return;

    form.setValues({
      id: place.id,
      name: place.name,
      domain: place.domain,
      type: place.type.id,
      template: place.template,
      color_scheme: place.color_scheme,
      favicon: place.favicon ?? undefined,
      og_img: place.og_img ?? undefined,
      logo_light: place.logo_light ?? undefined,
      logo_dark: place.logo_dark ?? undefined,
      counter_head: place.counter_head,
      counter_body: place.counter_body,
      thankyou_type: place.thankyou_type,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  return (
    <PageLoadingOverlay isPending={isPending}>
      <TitlePage subtitle={form.values.name} divider>
        Редактировать витрину
      </TitlePage>

      {error ? (
        <ErrorMessage error={error} buttonBack>
          Редактирование невозможно
        </ErrorMessage>
      ) : (
        <form
          onSubmit={form.onSubmit((values) => {
            const valuesNoImages = removeImagesIfString(values, arrayImagesForm);
            return updatePlace.mutate(objectToFormDate(valuesNoImages));
          })}
        >
          <FormPlaceAdd form={form} />
          {updatePlace.isError && (
            <ErrorMessage error={updatePlace.error}>Форма не отправлена</ErrorMessage>
          )}
          <GroupButtonForm disabled={updatePlace.isPending} />
        </form>
      )}
    </PageLoadingOverlay>
  );
}
