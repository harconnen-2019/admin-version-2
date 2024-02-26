import { useNavigate } from 'react-router-dom';

import { Button, Group, Space } from '@mantine/core';
import { useForm } from '@mantine/form';

import { FormPlaceAdd, placeType, useCreatePlace } from '@/entities/place';
import { getFormDate } from '@/shared/lib';
import { ErrorMessage, TitlePage } from '@/shared/ui';

/**
 * Страница добавления новой витрины
 * @returns форма добавления витрины
 */
export default function PlaceCreatePage() {
  const navigate = useNavigate();
  const createPlace = useCreatePlace();

  const allValidate = (value: string) =>
    value.length === 0 ? 'Обязательно для заполнения' : undefined;

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
      type: (value: number) => (value === 0 ? 'Обязательно для заполнения' : undefined),
      name: allValidate,
      domain: allValidate,
      template: allValidate,
    },
  });

  return (
    <>
      <TitlePage>Новая витрина</TitlePage>
      <form
        onSubmit={form.onSubmit((values) => {
          return createPlace.mutate(getFormDate(values));
        })}
      >
        <FormPlaceAdd form={form} />
        <Space h={50} />
        {createPlace.isError && (
          <ErrorMessage error={createPlace.error}>Форма не отправлена</ErrorMessage>
        )}
        <Space h={50} />
        <Group>
          <Button type="submit" variant="light" disabled={createPlace.isPending}>
            Отправить форму
          </Button>
          <Button type="button" variant="default" onClick={() => navigate(-1)}>
            Вернуться назад
          </Button>
        </Group>
      </form>
    </>
  );
}
