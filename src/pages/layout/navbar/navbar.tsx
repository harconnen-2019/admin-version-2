import { Box, Code, Divider, Group, Text, Tooltip } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconHome, IconLanguage, IconLogout, IconPin, IconUser } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { PATH_PAGE } from '@/pages/path';
import { VERSION } from '@/shared/lib';
import classes from './navbar.module.css';

/**
 * Боковая навигация
 * @returns JSX Element
 */
export function Navbar() {
  const title = `Maombi-Admin - ${process.env.NODE_ENV}`;
  useDocumentTitle(title);
  const { place, user } = useAuth();

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

        {place &&
          linkItem(
            PATH_PAGE.place.root,
            'Витрины',
            <IconPin className={classes.linkIcon} stroke={1.5} />,
          )}
        <Box ml={30}>{titleNavBar(place?.name, 'Активная витрина')}</Box>

        <Divider my="sm" label="Справочник" labelPosition="left" />

        {linkItem(
          PATH_PAGE.thesaurus.language.root,
          'Языки',
          <IconLanguage className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>

      <div className={classes.footer}>
        {user &&
          linkItem(
            '/profile',
            user ?? 'user',
            <IconUser className={classes.linkIcon} stroke={1.5} />,
          )}

        {linkItem(
          PATH_PAGE.logout,
          'Выход',
          <IconLogout className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>
    </nav>
  );
}
