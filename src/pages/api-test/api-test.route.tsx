import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { ApiPage } from './api-test.ui';

export const ApiTestPageRoute: RouteObject = {
  path: pathKeys.apiTestDisplay(),
  element: createElement(ApiPage),
};
