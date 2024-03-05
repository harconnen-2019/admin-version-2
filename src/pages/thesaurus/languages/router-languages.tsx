import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { Loadable } from '@/shared/ui';

// eslint-disable-next-line react-refresh/only-export-components
const LanguageListPage = Loadable(lazy(() => import('./list/language-list-page')));
// eslint-disable-next-line react-refresh/only-export-components
const LanguageCreatePage = Loadable(lazy(() => import('./create/language-create-page')));
// eslint-disable-next-line react-refresh/only-export-components
const LanguageEditPage = Loadable(lazy(() => import('./edit/language-edit-page')));

export const routerLanguages = (
  <>
    <Route path="/thesaurus/languages" element={<LanguageListPage />} />
    <Route path="/thesaurus/languages/create" element={<LanguageCreatePage />} />
    <Route path="/thesaurus/languages/:languageId/edit" element={<LanguageEditPage />} />
  </>
);
