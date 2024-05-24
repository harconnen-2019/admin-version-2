import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { DashboardPage } from './dashboard-page.ui';

export const DashboardPageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(DashboardPage),
  // loader: async (arguments_) => {
  // if (sessionModel.hasToken()) {
  //   onArticlesFeed();
  // } else {
  //   onArticles();
  // }

  // Promise.all([
  // sessionQueries.userService.prefetchQuery(),
  // articleQueries.infinityArticlesService.prefetchQuery(articleFilterStore),
  // tagQueries.tagsService.prefetchQuery(),
  // ]);

  // return arguments_;
  // },
};
