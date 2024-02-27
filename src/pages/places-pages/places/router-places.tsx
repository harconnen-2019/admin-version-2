import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { Loadable } from '@/shared/ui';

// eslint-disable-next-line react-refresh/only-export-components
const PlaceListPage = Loadable(lazy(() => import('./list/place-list-page')));
// eslint-disable-next-line react-refresh/only-export-components
const PlaceCreatePage = Loadable(lazy(() => import('./create/place-create-page')));
// eslint-disable-next-line react-refresh/only-export-components
const PlaceEditPage = Loadable(lazy(() => import('./edit/place-edit-page')));

export const routerPlaces = (
  <>
    <Route path="/places" element={<PlaceListPage />} />
    <Route path="/places/create" element={<PlaceCreatePage />} />
    <Route path="/places/:placeId/edit" element={<PlaceEditPage />} />
  </>
);
