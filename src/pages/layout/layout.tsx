import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppShell, Box, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { sessionQueries } from '@/entities/session';
import { pathKeys } from '@/shared/lib/react-router';

import { Header } from './header/header';
import { Navbar } from './navbar/navbar';

/**
 * Шаблон общий всех приватных страниц
 * @returns JSX Element
 */
export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  const { data: session } = useSuspenseQuery(sessionQueries.sessionService.queryOptions());
  const navigate = useNavigate();

  useEffect(() => {
    if (session.success !== 1) navigate(pathKeys.login());
  }, [session, navigate]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar session={session} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box maw="90%" mx="auto">
          <Outlet />
        </Box>
        <Space h={100} />
      </AppShell.Main>
    </AppShell>
  );
}
