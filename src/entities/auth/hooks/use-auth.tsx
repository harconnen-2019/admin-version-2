import { useContext } from 'react';

import { AuthContext } from '../context/auth-provider';

/**
 * Хук для доступа к контексту "AuthContext" методы пользователя и витрины
 * @returns Данные и методы контекста {user, place, signIn, session,}
 */
export function useAuth() {
  return useContext(AuthContext);
}
