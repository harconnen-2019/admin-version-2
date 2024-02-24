import { AppShell, Box, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet } from 'react-router-dom';

import { SpinnerPage } from '@/shared/ui';

import { Header } from './header/header';
import { useLayout } from './hooks';
// import { Navbar } from './navbar/navbar';

/**
 * Шаблон общий всех приватных страниц
 * @returns JSX Element
 */
export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  const { data, isLoading } = useLayout();

  // Показываем спиннер пока подгружается сессия и пока не придут данные
  if (isLoading || data?.success !== 1) {
    return <SpinnerPage />;
  }

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
        {/* <Navbar user={data?.session?.user?.username} place={data?.session?.place} /> */}
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
