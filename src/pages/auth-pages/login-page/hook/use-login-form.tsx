import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { authApi } from '@/entities/auth';
import { useAuth } from '@/shared/hooks';

/**
 * ХУК для страницы авторизации
 * Отправляет данные, при положительном ответе перенаправляет на главную
 * @returns метод отправки, ошибка, индикатор отправки
 */
export function useLoginForm() {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const handleSubmit = (value: { username: string; password: string }) => {
    setError(undefined);
    setIsSend(true);

    authApi
      .login(value)
      .then((data) => {
        const currentUser = data?.session?.user?.username;
        // Замедление, чтобы сессия успела обновится
        if (currentUser)
          setTimeout(() => {
            signIn(currentUser, () => navigate(fromPage, { replace: true }));
          }, 2000);
      })
      .catch((error_) => {
        setError(error_);
        setIsSend(false);
        // Log.warn('Log: Авторизация провалена ', error_);
      });
  };

  return { handleSubmit, isSend, error };
}
