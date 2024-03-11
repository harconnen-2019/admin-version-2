import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { PlaceCreatePage } from './place-create.ui';

export const PlaceCreateRoute: RouteObject = {
  path: pathKeys.places.create(),
  element: createElement(PlaceCreatePage),
};
