import { createContext, useMemo, useState } from 'react';

type User = string | undefined;
type Place = { id: number; name: string } | undefined;
type SignIn = (newUser: string, callback: VoidFunction) => void;
type Session = (
  currentUser: User,
  currentPlace: Place,
  callback?: VoidFunction | undefined,
) => void;

interface AuthContextType {
  user: User;
  place: Place;
  signIn: SignIn;
  session: Session;
}

export const AuthContext = createContext<AuthContextType>(undefined!);

/**
 * При удачной авторизации сохраняет пользователя в состояние
 * Также сохраняет данные сессии для использования в сервисах
 * Place - текущая витрина, с которой будет работать пользователь в админке
 * Для обращения к данным контекста создан хук useAuth()
 * @param root0 Объект данных
 * @param root0.children Дерево компонентов
 * @returns HOC {user, place, signIn, session,}
 */
export function AuthProvider({ children }: Readonly<{ children: JSX.Element }>) {
  const [user, setUser] = useState<User>();
  const [place, setPlace] = useState<Place>();

  /**
   * Метод записывает пользователя и витрину в контекст
   * @param currentUser Текущий пользователь
   * @param currentPlace Текущая витрина
   * @param callback callback опционально
   */
  const session: Session = (currentUser, currentPlace, callback) => {
    setUser(currentUser);
    setPlace(currentPlace);
    callback && callback();
  };

  /**
   * Во время авторизации записывает пользователя в контекст
   * @param newUser Пользователь
   * @param callback callback (переход в dashboard)
   */
  const signIn: SignIn = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  /**
   * Метод выхода не нужен, так как используется метод на сервере (переход по ссылке для удаления сессии)
   */
  // const signOut = (callback: VoidFunction) => {
  //   setUser(null);
  //   callback();
  // };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      place,
      signIn,
      session,
    }),
    [user, place],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
