import { useForm } from '@mantine/form';

import { FormPlaceAdd, placeType, useGetPlace, useUpdatePlace } from '@/entities/places';
import { defaultValidate, getFormDate } from '@/shared/lib';
import { ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';
import { Box, Loader, LoadingOverlay } from '@mantine/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Страница добавления новой витрины
 * @returns форма добавления витрины
 */
export default function PlaceEditPage() {
  const { placeId } = useParams();
  const updatePlace = useUpdatePlace();
  const { data, error, isPending } = useGetPlace(placeId);

  const place = data?.places_item ?? undefined;

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

  /**
   * Удаляем поля картинок, если в них значение string
   * это значит, что они не изменялись и отправлять на сервер их не нужно
   * @param state состояние формы
   * @returns FormData
   */
  const removeImgIfString = (state: placeType.IRequestPutPlace) => {
    const object = { ...state };

    if (object.favicon !== '' && typeof object.favicon === 'string') {
      object.favicon = undefined;
    }
    if (object.og_img !== '' && typeof object.og_img === 'string') {
      object.og_img = undefined;
    }
    if (object.logo_light !== '' && typeof object.logo_light === 'string') {
      object.logo_light = undefined;
    }
    if (object.logo_dark !== '' && typeof object.logo_dark === 'string') {
      object.logo_dark = undefined;
    }

    return getFormDate(object);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isPending} loaderProps={{ children: <Loader size={30} /> }} />

      <TitlePage>Редактировать витрину</TitlePage>
      {error ? (
        <ErrorMessage error={error} buttonBack>
          Редактирование невозможно
        </ErrorMessage>
      ) : (
        <form
          onSubmit={form.onSubmit((values) => {
            return updatePlace.mutate(removeImgIfString(values));
          })}
        >
          <FormPlaceAdd form={form} />
          {updatePlace.isError && (
            <ErrorMessage error={updatePlace.error}>Форма не отправлена</ErrorMessage>
          )}
          <GroupButtonForm disabled={updatePlace.isPending} />
        </form>
      )}
    </Box>
  );
}
