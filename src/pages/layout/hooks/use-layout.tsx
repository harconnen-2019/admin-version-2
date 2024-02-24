import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/entities/auth';
import { useAuth } from '@/shared/hooks';

/**
 * Проверяем данные из сессии каждый раз (так решили)
 * Если нет подтверждения или приходит ошибка возвращаем пользователя на страницу /login
 * Если все Ок то записываем в context данные пользователя и текущую витрину
 * @returns Данные, Факт загрузки
 */
export function useLayout() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const { isLoading, error, data } = useQuery(authApi.key, () => authApi.session());

  useEffect(() => {
    if ((isLoading === false && data?.success !== 1) || error !== null) {
      return session(undefined, undefined, () => navigate('/login'));
    }

    const currentUser = data?.session?.user?.username ?? undefined;
    const currentPlace = data?.session?.place ?? undefined;

    return session(currentUser, currentPlace);
  }, [navigate, data, error, isLoading, session]);

  return { data, isLoading };
}
