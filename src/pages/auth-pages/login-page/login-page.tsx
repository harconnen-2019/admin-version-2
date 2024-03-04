import {
  Alert,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useLogin } from '@/entities/auth';
import classes from './login.module.css';

/**
 * Страница авторизации
 * @returns JSX Element
 */
export function LoginPage() {
  const login = useLogin();

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
          <form onSubmit={form.onSubmit((values) => login.mutate(values))}>
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
            {login.error && (
              <>
                <Space h="md" />
                <Alert variant="light" color="red">
                  <Text c="red" size="sm">
                    Ошибка: {login.error.message}
                  </Text>
                </Alert>
              </>
            )}
            <Button type="submit" fullWidth mt="xl" disabled={login.isPending}>
              Войти
            </Button>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}
