import {
  CheckIcon,
  ColorSwatch,
  Fieldset,
  Grid,
  Group,
  NativeSelect,
  SegmentedControl,
  Space,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useState } from 'react';

import { SelectPlaceTypes } from '@/entities/places-types';
import { ImageUpload } from '@/shared/ui';
import { IRequestPostPlace, IRequestPutPlace } from '../../api/types';

const segments = [
  { label: 'Витрина', value: '1' },
  { label: 'Картинки', value: '2' },
  { label: 'Счетчики', value: '3' },
];

const themeColor = [
  { theme: 'default', color: '#1066e7' },
  { theme: 'green', color: '#04724d' },
  { theme: 'pink', color: '#e40066' },
  { theme: 'purple', color: '#7b2cbf' },
  { theme: 'red', color: '#ef2917' },
  { theme: 'saffron', color: '#eac435' },
  { theme: 'yellow', color: '#ffa432' },
];

interface IProperties {
  form: UseFormReturnType<IRequestPostPlace> | UseFormReturnType<IRequestPutPlace>;
}

/**
 * Форма добавления и редактирования витрины
 * @param root0 пропсы
 * @param root0.form состояние формы
 * @returns JSX Element
 */
export function FormPlace({ form }: Readonly<IProperties>) {
  const [segment, setSegment] = useState('1');

  /**
   * Пока это единственное решение как принимать два интерфейса
   * UseFormReturnType<IRequestPostPlace> | UseFormReturnType<IRequestPutPlace>
   * И не делать в IRequestPutPlace поле id опциональным
   */
  const { getInputProps, setFieldValue, values } = form as UseFormReturnType<IRequestPostPlace>;

  return (
    <>
      <SegmentedControl value={segment} onChange={setSegment} data={segments} />
      <Space h={20} />
      {segment === '1' && (
        <>
          <Group mt="md" align="flex-end">
            <SelectPlaceTypes getInputProps={getInputProps('type')} />

            <NativeSelect label="Блок спасибо" {...getInputProps('thankyou_type')} mt="md">
              <option disabled value="">
                Выключено...
              </option>
              <option value="off">Выключено</option>
              <option value="pop">Модальное окно</option>
              <option value="page">Отдельная страница</option>
            </NativeSelect>
          </Group>

          <Group mt="xl">
            <TextInput
              withAsterisk
              label="Название"
              placeholder="Название витрины"
              {...getInputProps('name')}
              w={300}
            />
            <TextInput
              withAsterisk
              label="Домен"
              placeholder="Домен витрины"
              {...getInputProps('domain')}
              w={300}
            />
            <TextInput
              withAsterisk
              label="Шаблон"
              placeholder="Путь к дизайн-шаблону витрины"
              {...getInputProps('template')}
              w={300}
            />
          </Group>

          <Fieldset legend="Цветовая тема сайта" mt="xl">
            <Group>
              {themeColor.map((item) => (
                <ColorSwatch
                  key={item.theme}
                  onClick={() => setFieldValue('color_scheme', item.theme)}
                  color={item.color}
                  style={{ color: '#fff', cursor: 'pointer' }}
                >
                  {form.values.color_scheme === item.theme && (
                    <CheckIcon style={{ width: rem(12), height: rem(12) }} />
                  )}
                </ColorSwatch>
              ))}
            </Group>
          </Fieldset>
        </>
      )}

      {segment === '2' && (
        <Grid grow gutter="sm" mt="xl">
          <Grid.Col span={6}>
            <ImageUpload
              click={() => setFieldValue('favicon', undefined)}
              formValue={values['favicon']}
              getInputProps={getInputProps('favicon')}
              label="Favicon"
              note="Разрешено загружать: svg"
              accept="image/svg+xml"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ImageUpload
              click={() => setFieldValue('og_img', undefined)}
              formValue={values.og_img}
              getInputProps={getInputProps('og_img')}
              label="OG Постер"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ImageUpload
              click={() => setFieldValue('logo_light', undefined)}
              formValue={values.logo_light}
              getInputProps={getInputProps('logo_light')}
              label="Лого для темной темы"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ImageUpload
              click={() => setFieldValue('logo_dark', undefined)}
              formValue={values.logo_dark}
              getInputProps={getInputProps('logo_dark')}
              label="Лого для светлой темы"
            />
          </Grid.Col>
        </Grid>
      )}

      {segment === '3' &&
        ['counter_head', 'counter_body'].map((item) => (
          <Textarea
            key={item}
            label={`Код счетчиков : < ${item.slice(8, 12).toUpperCase()} >`}
            {...getInputProps(item)}
            mt="md"
            autosize
            minRows={4}
          />
        ))}
    </>
  );
}
