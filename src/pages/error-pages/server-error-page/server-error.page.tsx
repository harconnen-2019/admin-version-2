import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './server-error.module.css';

/**
 * Страница ошибки 500
 * @returns JSX Element
 */
export function ServerErrorPage() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Только что произошло что-то плохое...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Наши серверы не смогли обработать ваш запрос. Не волнуйтесь, наша команда разработчиков
          уже уже уведомлена. Попробуйте обновить страницу.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md">
            Обновить страницу
          </Button>
        </Group>
      </Container>
    </div>
  );
}
