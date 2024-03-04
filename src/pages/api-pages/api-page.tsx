import { BASE_URL, DEBUG, defaultValidate } from '@/shared/lib';
import { GroupButtonForm, TitlePage } from '@/shared/ui';
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

/**
 * Проверка ответов api
 * @returns JSX Element
 */
export default function ApiPage() {
  const [api, setApi] = useState<string>();

  const form = useForm({
    initialValues: {
      url: `${BASE_URL}/places/item/`,
      query: '',
      method: DEBUG ? 'PATCH' : 'LIST',
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

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          throw (data && data.message) || response.status;
        }

        setApi(JSON.stringify(data));
      })
      .catch((error) => {
        console.error('There was an error!', error);
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
                {copied ? 'Copied json' : 'Copy json'}
              </Button>
            )}
          </CopyButton>
          <Textarea label="JSON" mt="md" value={api} rows={16} />
        </>
      )}
    </>
  );
}
