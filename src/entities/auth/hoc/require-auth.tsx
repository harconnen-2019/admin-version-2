import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PATH } from '@/pages/path';
import { SpinnerPage } from '@/shared/ui';

import { useAuth } from '../hooks/use-auth';
import { useGetAuth } from '../hooks/use-auth-query';

/**
 * HOC Проверка на авторизацию пользователя
 * Сейчас этот функционал отключен
 * @param root0 пропсы
 * @param root0.children шаблон
 * @returns JSX Element или перенаправление на авторизацию
 */
export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
  const location = useLocation;
  const navigate = useNavigate();
  const { session } = useAuth();

  const { isLoading, data, error } = useGetAuth();

  useEffect(() => {
    if ((isLoading === false && data?.success !== 1) || error !== null) {
      return session(undefined, undefined, () => navigate(PATH.login));
    }

    const currentUser = data?.session?.user?.username ?? undefined;
    const currentPlace = data?.session?.place ?? undefined;

    return session(currentUser, currentPlace);
  }, [navigate, data, error, isLoading, session, location]);

  // Показываем спиннер пока подгружается сессия и пока не придут данные
  if (isLoading || data?.success !== 1) {
    return <SpinnerPage />;
  }

  return children;
}
