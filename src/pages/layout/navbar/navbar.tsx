import { Box, Code, Divider, Group, Text } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import {
  IconAlbum,
  IconAppWindow,
  IconApps,
  IconBinary,
  IconHelpHexagon,
  IconHome,
  IconLanguage,
  IconLogout,
  IconMessage,
  IconPin,
  IconPrompt,
  IconServer2,
  IconTag,
  IconTags,
  IconUser,
} from '@tabler/icons-react';
import { NavLink, useParams } from 'react-router-dom';

import { applicationApi } from '@/entities/application';
import { placeType } from '@/entities/place';
import { PATH_PAGE, VERSION } from '@/shared/lib';
import { useEffect, useState } from 'react';
import classes from './navbar.module.css';

interface Properties {
  user: string | null;
  place: placeType.IPlace | null;
}

/**
 *
 * @param root0
 * @param root0.user
 * @param root0.place
 */
export function Navbar({ user, place }: Properties) {
  const [currentApp, setCurrentApp] = useState<string>('');
  const title = `Maombi-Admin - ${process.env.NODE_ENV}`;
  useDocumentTitle(title);
  const { applicationId } = useParams();

  const { data } = applicationApi.useGet(String(applicationId));

  useEffect(() => {
    if (applicationId) {
      data?.applications_item.name && setCurrentApp(data?.applications_item.name);
    }
  }, [applicationId, data]);

  /**
   *
   * @param to
   * @param name
   * @param ico
   */
  function linkItem(to: string, name: string, ico: any) {
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
  }

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

        {linkItem(
          PATH_PAGE.promt.root,
          'Промты',
          <IconPrompt className={classes.linkIcon} stroke={1.5} />,
        )}

        {linkItem(
          PATH_PAGE.app.root,
          'Приложения',
          <IconApps className={classes.linkIcon} stroke={1.5} />,
        )}

        <Box ml={30}>
          {applicationId && (
            <Text c="var(--mantine-color-grape-light-color)" mb="sm" mt="sm">
              {currentApp}
            </Text>
          )}

          {applicationId && (
            <>
              {linkItem(
                PATH_PAGE.app.build.root(applicationId),
                'Сборки',
                <IconServer2 className={classes.linkIcon} stroke={1.5} />,
              )}

              {linkItem(
                PATH_PAGE.app.faq.root(applicationId),
                'Вопросы',
                <IconHelpHexagon className={classes.linkIcon} stroke={1.5} />,
              )}

              {linkItem(
                PATH_PAGE.app.comment.root(applicationId),
                'Комментарии',
                <IconMessage className={classes.linkIcon} stroke={1.5} />,
              )}

              {linkItem(
                PATH_PAGE.app.tag(applicationId),
                'Теги',
                <IconTag className={classes.linkIcon} stroke={1.5} />,
              )}
            </>
          )}
        </Box>

        <Divider my="sm" label="Справочник" labelPosition="left" />

        {linkItem(
          PATH_PAGE.publisher.root,
          'Издатели',
          <IconAlbum className={classes.linkIcon} stroke={1.5} />,
        )}

        {linkItem(
          PATH_PAGE.tag.root,
          'Теги',
          <IconTags className={classes.linkIcon} stroke={1.5} />,
        )}

        {linkItem(
          PATH_PAGE.platform.root,
          'Платформы',
          <IconBinary className={classes.linkIcon} stroke={1.5} />,
        )}

        {linkItem(
          PATH_PAGE.system.root,
          'Операционные системы',
          <IconAppWindow className={classes.linkIcon} stroke={1.5} />,
        )}

        {linkItem(
          PATH_PAGE.language.root,
          'Языки',
          <IconLanguage className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>

      <div className={classes.footer}>
        {linkItem('#', user ?? 'user', <IconUser className={classes.linkIcon} stroke={1.5} />)}
        {linkItem(
          PATH_PAGE.logout,
          'Выход',
          <IconLogout className={classes.linkIcon} stroke={1.5} />,
        )}
      </div>
    </nav>
  );
}
