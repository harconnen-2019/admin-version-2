import { RouterProvider, createBrowserRouter, redirect, useRouteError } from 'react-router-dom';

import { sessionQueries } from '@/entities/session';
import { Layout } from '@/pages/layout';
import { pathKeys } from '@/shared/lib/react-router';

import { ApiTestPageRoute } from '@/pages/api-test';
import { DashboardPageRoute } from '@/pages/dashboard';
import { Page404Route, Page500Route } from '@/pages/errors';
import { LoginPageRoute } from '@/pages/login';
import { PlaceRoutes } from '@/pages/places/place';
import { LanguageRoutes } from '@/pages/thesaurus/languages';

/**
 * Выбрасываем ошибку
 * https://github.com/remix-run/react-router/discussions/10166
 * @returns undefined
 */
function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
}

/**
 * Все закрытые маршруты, подключаются дочерними к <Layout />
 * Перенаправление на логи отрабатывается внутри компонента Layout (пока устраивает так)
 */
const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <Layout />,
        path: pathKeys.home(),
        loader: async (arguments_) => {
          sessionQueries.sessionService.prefetchQuery();

          return arguments_;
        },

        children: [
          DashboardPageRoute,
          ApiTestPageRoute,
          ...PlaceRoutes,
          ...LanguageRoutes,
          Page500Route,
        ],
      },
      LoginPageRoute,
      Page404Route,
      {
        loader: async () => redirect(pathKeys.page404()),
        path: '*',
      },
    ],
  },
]);

/**
 * Маршрутизатор приложения
 * @returns JSX.Element
 */
export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
