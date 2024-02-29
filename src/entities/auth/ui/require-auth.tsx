import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

/**
 * HOC Проверка на авторизацию пользователя
 * Сейчас этот функционал отключен
 * @param root0 пропсы
 * @param root0.children шаблон
 * @returns JSX Element или перенаправление на авторизацию
 */
export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
  const location = useLocation;
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
