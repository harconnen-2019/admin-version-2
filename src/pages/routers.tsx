import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/shared/context';

import { LoginPage } from './auth-pages';
import { DashboardPage } from './dashboard-page';
import { NotFoundPage, ServerErrorPage } from './error-pages';
import { Layout } from './layout';

/**
 * Формирование маршрутизатора всего приложения
 * Авторизация пользователя проверяется в компоненте Layout, все закрытые страницы должны у него быть дочерними
 * @returns приложение с маршрутами, обернутое в контекст "AuthProvider", для доступа к нему вызывать useAuth()
 */
export function Routers() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
