import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { placeQueries } from '@/entities/place';
import { pathKeys } from '@/shared/lib/react-router';
import { PlaceListPage } from './place-list.ui';

export const PlaceListRoute: RouteObject = {
  path: pathKeys.places.root(),
  element: createElement(PlaceListPage),
  loader: async (arguments_) => {
    placeQueries.serviceList.prefetchQuery();
    return arguments_;
  },
};
