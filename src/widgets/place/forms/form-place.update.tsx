import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { placeInitial, placeQueries, placeTypes } from '@/entities/place';
import { UpdatePlace } from '@/entities/place/place.types';
import { removeImagesIfString } from '@/shared/lib';
import { withSuspense } from '@/shared/lib/react';
import { ErrorHandler, GroupButtonForm, SpinnerData } from '@/shared/ui';
import { FormPlace } from './form-place.ui';

/**
 * Редактирование витрины
 * @returns форма редактирования
 */
function FormUpdate() {
  const { placeId } = useParams() as placeTypes.PlaceParameters;

  const {
    mutate: updatePlace,
    isPending,
    isError,
    error,
  } = placeQueries.useUpdateMutation(placeId);

  const { data: place, status } = useSuspenseQuery(placeQueries.serviceById.queryOptions(placeId));

  // Картинки в форме, которые имеют типизацию string или File
  const arrayImagesForm = ['favicon', 'og_img', 'logo_light', 'logo_dark'];

  /**
   * Инициализация состояния формы редактирования
   * Указание полей для валидации
   */
  const form = useForm<placeTypes.UpdatePlace>({
    initialValues: placeInitial.placeInitialUpdate(placeId),
    validate: placeInitial.placeFormValidate,
  });

  /**
   * Получаем данные из api и заменяем ими инициализированные данные в форме
   * Линтер ругается, хочет подключить в массив "form", но она там не нужна
   */
  useEffect(() => {
    status === 'success' && place && form.setValues(placeInitial.placeLoadFromApi(place));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const valuesNoImages = removeImagesIfString<UpdatePlace>(values, arrayImagesForm);
        return updatePlace({ place: valuesNoImages });
      })}
    >
      <Text c="grape" size="xl" fw={700} mt="md" mb="xl">
        {form.values.name}
      </Text>
      <FormPlace form={form} />
      {
        // Ошибка отправки формы
        isError && <ErrorHandler error={error} />
      }
      <GroupButtonForm disabled={isPending} />
    </form>
  );
}

const SuspensedForm = withSuspense(FormUpdate, {
  fallback: <SpinnerData />,
});

export const FormPlaceUpdate = withErrorBoundary(SuspensedForm, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} buttonBack />,
});
