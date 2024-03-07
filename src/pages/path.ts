export const PATH = {
  root: '/',
  login: '/login',
  logout: '/api/red/users/logout',
  api: '/api',
  page404: '/404',
  page500: '/500',
  places: {
    root: '/places',
    create: '/places/create',
    edit: (placeId: string | number) => `/places/${placeId}/edit`,
  },
  thesaurus: {
    languages: {
      root: '/thesaurus/languages',
      create: '/thesaurus/languages/create',
      edit: (langId: string | number) => `/thesaurus/languages/${langId}/edit`,
    },
  },
};
