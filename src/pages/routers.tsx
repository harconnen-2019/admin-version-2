import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider, RequireAuth } from '@/entities/auth';
import { Loadable } from '@/shared/ui';

import { NotFoundPage, ServerErrorPage } from './errors-pages';
import { Layout } from './layout';
import { PATH } from './path';

const Login = Loadable(lazy(() => import('./auth-pages')));
const Api = Loadable(lazy(() => import('./api-pages/api-page')));
const Dashboard = Loadable(lazy(() => import('./dashboard-page')));

const PlaceList = Loadable(lazy(() => import('./places-pages/places/list')));
const PlaceCreate = Loadable(lazy(() => import('./places-pages/places/create')));
const PlaceEdit = Loadable(lazy(() => import('./places-pages/places/edit')));

const LangList = Loadable(lazy(() => import('./thesaurus/languages/list')));
const LangCreate = Loadable(lazy(() => import('./thesaurus/languages/create')));
const LangEdit = Loadable(lazy(() => import('./thesaurus/languages/edit')));

/**
 * Формирование маршрутизатора всего приложения
 * Авторизация пользователя проверяется в компоненте Layout, все закрытые страницы должны у него быть дочерними
 * @returns приложение с маршрутами, обернутое в контекст "AuthProvider", для доступа к нему вызывать useAuth()
 */
export function Routers() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path={PATH.root}
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={PATH.api} element={<Api />} />
          <Route path={PATH.page500} element={<ServerErrorPage />} />

          <Route path={PATH.places.root} element={<PlaceList />} />
          <Route path={PATH.places.create} element={<PlaceCreate />} />
          <Route path={`${PATH.places.root}/:placeId/edit`} element={<PlaceEdit />} />

          <Route path={PATH.thesaurus.languages.root} element={<LangList />} />
          <Route path={PATH.thesaurus.languages.create} element={<LangCreate />} />
          <Route path={`${PATH.thesaurus.languages.root}/:langId/edit`} element={<LangEdit />} />
        </Route>
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.page404} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
