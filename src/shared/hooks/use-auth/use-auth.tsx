import { AuthContext } from '@/shared/context';
import { useContext } from 'react';

/**
 * Хук для доступа к контексту "AuthContext" методы пользователя и витрины
 * @returns Данные и методы контекста {user, place, signIn, session,}
 */
export function useAuth() {
  return useContext(AuthContext);
}
