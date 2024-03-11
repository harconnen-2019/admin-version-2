import { placeQueries } from '@/entities/place';
import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { PlaceEditPage } from './place-edit.ui';

export const PlaceEditRoute: RouteObject = {
  path: '/places/:placeId/edit',
  element: createElement(PlaceEditPage),
  loader: async (arguments_) => {
    placeQueries.serviceById.prefetchQuery(arguments_.params.placeId!);
    return arguments_;
  },
};
