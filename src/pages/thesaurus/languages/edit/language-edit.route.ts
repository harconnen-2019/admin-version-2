import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { languageQueries } from '@/entities/thesaurus/language';
import { LanguageEditPage } from './language-edit.ui';

export const LanguageEditRoute: RouteObject = {
  path: '/thesaurus/languages/:langId/edit',
  element: createElement(LanguageEditPage),
  loader: async (arguments_) => {
    languageQueries.serviceById.prefetchQuery(arguments_.params.langId!);
    return arguments_;
  },
};
