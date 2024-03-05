import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '@mantine/form';

import {
  FormPlace,
  placeFormValidate,
  placeInitialPut,
  placeLoadFromApi,
  placeType,
  useGetPlace,
  useUpdatePlace,
} from '@/entities/places';
import { objectToFormDate, removeImagesIfString } from '@/shared/lib';
import { CustomLoadingOverlay, ErrorMessage, GroupButtonForm, TitlePage } from '@/shared/ui';

/**
 * Страница редактирования витрины
 * //TODO проверка placeId - TS ругается возможен undefined
 * @returns страница
 */
export default function PlaceEditPage() {
  const { placeId } = useParams();
  const updatePlace = useUpdatePlace();

  const { data, error, status } = useGetPlace(placeId!);
  const place = data?.places_item ?? undefined;

  // Картинки в форме, которые имеют типизацию string или File
  const arrayImagesForm = ['favicon', 'og_img', 'logo_light', 'logo_dark'];

  /**
   * Инициализация состояния формы редактирования
   * Указание полей для валидации
   */
  const form = useForm<placeType.IRequestPutPlace>({
    initialValues: placeInitialPut(placeId!),
    validate: placeFormValidate,
  });

  /**
   * Получаем данные из api и заменяем ими инициализированные данные в форме
   * Линтер ругается, хочет подключить в массив "form", но она там не нужна
   */
  useEffect(() => {
    status === 'success' && place && form.setValues(placeLoadFromApi(place));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  return (
    <CustomLoadingOverlay isPending={status === 'pending'}>
      <TitlePage subtitle={form.values.name} divider>
        Редактировать витрину
      </TitlePage>

      {
        // Ошибка загрузки данных для формы
        error ? (
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
            <FormPlace form={form} />
            {
              // Ошибка отправки формы
              updatePlace.isError && (
                <ErrorMessage error={updatePlace.error}>Форма не отправлена</ErrorMessage>
              )
            }
            <GroupButtonForm disabled={updatePlace.isPending} />
          </form>
        )
      }
    </CustomLoadingOverlay>
  );
}
