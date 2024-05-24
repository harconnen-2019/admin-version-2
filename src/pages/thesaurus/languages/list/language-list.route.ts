import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { languageQueries } from '@/entities/thesaurus/language';
import { pathKeys } from '@/shared/lib/react-router';
import { LanguageListPage } from './language-list.ui';

export const LanguageListRoute: RouteObject = {
  path: pathKeys.languages.root(),
  element: createElement(LanguageListPage),
  loader: async (arguments_) => {
    languageQueries.serviceList.prefetchQuery();
    return arguments_;
  },
};
