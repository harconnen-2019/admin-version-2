import { Box, Code, Divider, Group, Text, Tooltip } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconHome, IconLanguage, IconLogout, IconPin, IconUser } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

import { sessionTypes } from '@/entities/session';
import { VERSION } from '@/shared/api';
import { pathKeys } from '@/shared/lib/react-router';

import classes from './navbar.module.css';

/**
 * Боковая навигация
 * @param root0 пропсы
 * @param root0.session сессия пользователя
 * @returns JSX Element
 */
export function Navbar({ session }: Readonly<{ session: sessionTypes.Session }>) {
  const title = `Maombi-Admin - ${process.env.NODE_ENV}`;
  useDocumentTitle(title);

  /**
   * ССылки для боковой навигации
   * @param to url
   * @param name название
   * @param ico иконка
   * @returns JSX Element
   */
  const linkItem = (to: string, name: string, ico: JSX.Element) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.link}` : classes.link
        }
      >
        {ico} {name}
      </NavLink>
    );
  };

  /**
   * Заголовок для группы ссылок с подсказкой
   * @param name название
   * @param label подсказка
   * @returns JSX Element
   */
  const titleNavBar = (name: string | undefined, label: string) => {
    return (
      <Tooltip label={label} color="grape" arrowOffset={20} withArrow position="top-start">
        <Text
          c="var(--mantine-color-grape-light-color)"
          mb="sm"
          mt="sm"
          style={{ cursor: 'default' }}
        >
          {name ?? ''}
        </Text>
      </Tooltip>
    );
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>
            {process.env.NODE_ENV}, {VERSION}
          </Code>
        </Group>

        {linkItem('/', 'Главная', <IconHome className={classes.linkIcon} stroke={1.5} />)}

        {session.place &&
          linkItem(
            pathKeys.places.root(),
            'Витрины',
            <IconPin className={classes.linkIcon} stroke={1.5} />,
          )}
        <Box ml={30}>{titleNavBar(session.place?.name, 'Активная витрина')}</Box>

        <Divider my="sm" label="Справочник" labelPosition="left" />

        {linkItem(
          pathKeys.languages.root(),
          'Языки',
          <IconLanguage className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>

      <div className={classes.footer}>
        {session.user &&
          linkItem(
            '/profile',
            session.user.username ?? 'user',
            <IconUser className={classes.linkIcon} stroke={1.5} />,
          )}

        {linkItem(
          pathKeys.logout(),
          'Выход',
          <IconLogout className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>
    </nav>
  );
}
