import {
  CheckIcon,
  ColorSwatch,
  Grid,
  Group,
  NativeSelect,
  SegmentedControl,
  Space,
  Text,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useState } from 'react';

// import { placeTypeApi } from '../../api/place-type-api';
import { IRequestPostPlace, IRequestPutPlace } from '../../api/types';
import { PlaceImgUpload } from './place-img-upload';

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
  form: UseFormReturnType<IRequestPostPlace | Omit<IRequestPutPlace, 'id'>>;
}

/**
 * Форма добавления и редактирования витрины
 * @param root0 пропсы
 * @param root0.form состояние формы
 * @returns JSX Element
 */
export function FormPlaceAdd({ form }: Readonly<IProperties>) {
  const [segment, setSegment] = useState('1');

  // const { data: typePlaceList } = placeTypeApi.useList();

  return (
    <>
      <SegmentedControl value={segment} onChange={setSegment} data={segments} />
      <Space h={20} />
      {segment === '1' && (
        <>
          <Group mt="md">
            <NativeSelect
              withAsterisk
              label="Тип витрины"
              {...form.getInputProps('type')}
              mt="md"
              w={300}
            >
              <option disabled value="0">
                Выбрать...
              </option>
              <option value="1">Выбрать...</option>
              {/* {typePlaceList?.places_type_list?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))} */}
            </NativeSelect>

            <NativeSelect label="Блок спасибо" {...form.getInputProps('thankyou_type')} mt="md">
              <option disabled value="">
                Выключено...
              </option>
              <option value="off">Выключено</option>
              <option value="pop">Модальное окно</option>
              <option value="page">Отдельная страница</option>
            </NativeSelect>
          </Group>

          <Group mt="md">
            <TextInput
              withAsterisk
              label="Название"
              placeholder="Название витрины"
              {...form.getInputProps('name')}
              w={300}
            />
            <TextInput
              withAsterisk
              label="Домен"
              placeholder="Домен витрины"
              {...form.getInputProps('domain')}
              w={300}
            />
            <TextInput
              withAsterisk
              label="Шаблон"
              placeholder="Путь к дизайн-шаблону витрины"
              {...form.getInputProps('template')}
              w={300}
            />
          </Group>

          <Text mt="xl">Цветовая тема сайта</Text>
          <Group mt="md">
            {themeColor.map((item) => (
              <ColorSwatch
                key={item.theme}
                onClick={() => form.setFieldValue('color_scheme', item.theme)}
                color={item.color}
                style={{ color: '#fff', cursor: 'pointer' }}
              >
                {form.values.color_scheme === item.theme && (
                  <CheckIcon style={{ width: rem(12), height: rem(12) }} />
                )}
              </ColorSwatch>
            ))}
          </Group>
        </>
      )}

      {segment === '2' && (
        <Grid grow gutter="sm" mt="xl">
          <Grid.Col span={6}>
            <PlaceImgUpload
              click={() => form.setFieldValue('favicon', undefined)}
              formValue={form.values['favicon']}
              getInputProps={form.getInputProps('favicon')}
              label="Favicon"
              note="Разрешено загружать: svg"
              accept="image/svg+xml"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PlaceImgUpload
              click={() => form.setFieldValue('og_img', undefined)}
              formValue={form.values.og_img}
              getInputProps={form.getInputProps('og_img')}
              label="OG Постер"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PlaceImgUpload
              click={() => form.setFieldValue('logo_light', undefined)}
              formValue={form.values.logo_light}
              getInputProps={form.getInputProps('logo_light')}
              label="Лого для темной темы"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PlaceImgUpload
              click={() => form.setFieldValue('logo_dark', undefined)}
              formValue={form.values.logo_dark}
              getInputProps={form.getInputProps('logo_dark')}
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
            {...form.getInputProps(item)}
            mt="md"
            autosize
            minRows={4}
          />
        ))}
    </>
  );
}
