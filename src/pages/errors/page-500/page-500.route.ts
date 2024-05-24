import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { Page500 } from './page-500.ui';

export const Page500Route: RouteObject = {
  path: pathKeys.page500(),
  element: createElement(Page500),
};
