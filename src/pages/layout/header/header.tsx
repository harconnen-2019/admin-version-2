import {
  ActionIcon,
  Burger,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import imgLogoLight from '@/shared/ui/assets/img/maombi-logo-light.png';
import imgLogo from '@/shared/ui/assets/img/maombi-logo.png';
import classes from './header.module.css';

interface Properties {
  opened: boolean;
  toggle: () => void;
}

/**
 * HEADER для панели управления - виден всегда (никаких данных не приходит)
 * Пока подключены : логотип, бургер меню, переключение темы
 * Для переключения темы используются хуки из UI библиотеки
 * useMantineColorScheme()
 * useComputedColorScheme()
 * @param param0 объект для мобильного меню
 * @param param0.opened состояние мобильного меню
 * @param param0.toggle переключатель мобильного меню
 * @returns JSX Element
 */
export function Header({ opened, toggle }: Readonly<Properties>) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="space-between" h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

      <img
        src={computedColorScheme === 'light' ? imgLogo : imgLogoLight}
        alt="Logo"
        className={classes.logo}
      />

      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
