import { Code, Divider, Group } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconHome, IconLogout, IconPin, IconUser } from '@tabler/icons-react';
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
            place.name,
            <IconPin className={classes.linkIcon} stroke={1.5} />,
          )}

        <Divider my="sm" label="Справочник" labelPosition="left" />
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
