import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/entities/auth';

import { LoginPage } from './auth-pages';
import { DashboardPage } from './dashboard-page';
import { NotFoundPage, ServerErrorPage } from './errors-pages';
import { Layout } from './layout';
import { PATH_PAGE } from './path';
import { routerPlaces } from './places-pages/places';

const privateRouter = (
  <>
    {routerPlaces}
    {/* {routerPlaceLanguage} */}
    {/* {routerStaticPage} */}
    {/* {routerPageLanguage} */}
  </>
);

/**
 * Формирование маршрутизатора всего приложения
 * Авторизация пользователя проверяется в компоненте Layout, все закрытые страницы должны у него быть дочерними
 * @returns приложение с маршрутами, обернутое в контекст "AuthProvider", для доступа к нему вызывать useAuth()
 */
export function Routers() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATH_PAGE.root} element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path={PATH_PAGE.page500} element={<ServerErrorPage />} />
          {privateRouter}
        </Route>
        <Route path={PATH_PAGE.login} element={<LoginPage />} />
        <Route path={PATH_PAGE.page404} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
