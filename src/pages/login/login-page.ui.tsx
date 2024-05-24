import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { withErrorBoundary } from 'react-error-boundary';

import { sessionQueries } from '@/entities/session';
import { ErrorHandler } from '@/shared/ui';
import classes from './login-page.module.css';

/**
 * Страница авторизации
 * @returns JSX Element
 */
function Page() {
  const { mutate: loginUser, isPending, isError, error } = sessionQueries.useLoginUserMutation();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      saveSession: false,
    },
    validate: {
      username: (value) => (value.length === 0 ? 'Забыли заполнить логин' : undefined),
      password: (value) => (value.length === 0 ? 'А пароль кто будет заполнять' : undefined),
    },
  });

  return (
    <Center h="100Vh">
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          С возвращением!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={form.onSubmit((values) => loginUser(values))}>
            <TextInput label="Логин" placeholder="Ваш логин" {...form.getInputProps('username')} />
            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              {...form.getInputProps('password')}
              mt="md"
            />
            <Group justify="space-between" mt="lg">
              <Checkbox
                label="Запомнить меня"
                {...form.getInputProps('saveSession', { type: 'checkbox' })}
              />
            </Group>
            {isError && (
              <>
                <Space h="md" />
                <ErrorHandler error={error} />
              </>
            )}
            <Button type="submit" fullWidth mt="xl" disabled={isPending}>
              Войти
            </Button>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}

export const LoginPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
