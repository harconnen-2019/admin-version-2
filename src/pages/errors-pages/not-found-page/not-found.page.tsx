import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './not-found.module.css';

/**
 * Страница ошибки 404
 * @returns JSX Element
 */
export function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Вы нашли тайное место.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        К сожалению, это всего лишь страница 404. Возможно, вы ошиблись в адресе, или страница была
        была перемещена на другой URL.
      </Text>
      <Group justify="center">
        <Link to="/">
          <Button variant="subtle" size="md">
            Верните меня на главную страницу
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
