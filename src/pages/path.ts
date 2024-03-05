export const PATH_PAGE = {
  root: '/',
  login: '/login',
  logout: '/api/red/users/logout',
  api: '/api',
  page404: '/404',
  page500: '/500',
  place: {
    root: '/places',
    create: '/places/create',
    edit: (placeId: string | number) => `/places/${placeId}/edit`,
  },
  thesaurus: {
    language: {
      root: '/thesaurus/language',
      create: '/thesaurus/language/create',
      edit: (id: string | number) => `/thesaurus/language/${id}/edit`,
    },
  },
};
