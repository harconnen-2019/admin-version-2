import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { LanguageCreatePage } from './language-create.ui';

export const LanguageCreateRoute: RouteObject = {
  path: pathKeys.languages.create(),
  element: createElement(LanguageCreatePage),
};
