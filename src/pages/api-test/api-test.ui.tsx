import {
  Button,
  CopyButton,
  Divider,
  Group,
  NativeSelect,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { DEBUG, baseUrl, methodList } from '@/shared/api';
import { defaultValidate } from '@/shared/lib';
import { GroupButtonForm, TitlePage } from '@/shared/ui';

/**
 * Проверка ответов api
 * @returns JSX Element
 */
export function ApiPage() {
  const [api, setApi] = useState<string>();

  const form = useForm({
    initialValues: {
      url: baseUrl('/places/item/'),
      query: '',
      method: methodList(),
    },

    validate: {
      url: defaultValidate,
      method: defaultValidate,
    },
  });

  const handleSubmit = () => {
    setApi('');

    const requestOptions = {
      method: form.values.method,
    };

    fetch(`${form.values.url}${form.values.query ? '?' + form.values.query : ''}`, requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // проверка ответа на ошибку
        if (!response.ok) {
          // получить сообщение об ошибке или по умолчанию получить статус ответа
          throw data?.message || response.status;
        }

        setApi(JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Произошла ошибка!', error);
      });
  };

  return (
    <>
      <TitlePage>API Test</TitlePage>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <Group>
          <NativeSelect withAsterisk label="Метод" {...form.getInputProps('method')}>
            <option disabled value="">
              Выключено...
            </option>
            <option value="GET">GET</option>
            <option value={DEBUG ? 'PATCH' : 'LIST'}>LIST</option>
            <option value="PATCH">PATCH</option>
          </NativeSelect>
          <TextInput withAsterisk label="Путь api" {...form.getInputProps('url')} w={500} />
          <TextInput
            label="Параметры"
            placeholder="id=2"
            {...form.getInputProps('query')}
            w={500}
          />
        </Group>
        <GroupButtonForm disabled={false} />
      </form>

      <Divider my="xl" />

      {api && (
        <>
          <CopyButton value={api}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                {copied ? 'json скопирован' : 'копирование json'}
              </Button>
            )}
          </CopyButton>
          <Textarea label="JSON" mt="md" defaultValue={api} rows={16} />
        </>
      )}
    </>
  );
}
