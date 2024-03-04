import { useLocation, useNavigate } from 'react-router-dom';
import classes from './server-error.module.css';

import { Alert, Button, Container, Group, Space, Text, Title } from '@mantine/core';

/**
 * Страница ошибки 500
 * @returns JSX Element
 */
export function ServerErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Произошло что-то плохое...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Наши серверы не смогли обработать ваш запрос.
          <br /> Не волнуйтесь, все норм, мы уже в разбираемся.
        </Text>
        <Alert variant="light" color="red" title="Ошибка">
          {location.state.error}
        </Alert>
        <Space h={30} />
        <Group justify="center">
          <Button variant="subtle" size="md" onClick={() => navigate(-1)}>
            Попробовать вернуться
          </Button>
        </Group>
      </Container>
    </div>
  );
}
