/* eslint-disable unicorn/prefer-spread */
import { PatchCrud } from './react-router.library';

/**
 * Пути по сайту
 */
export const pathKeys = {
  root: '/',

  login() {
    return pathKeys.root.concat('login/');
  },
  logout() {
    return `${pathKeys.root}api/red/users/logout/`;
  },
  home() {
    return pathKeys.root;
  },
  page404() {
    return pathKeys.root.concat('404/');
  },
  page500() {
    return pathKeys.root.concat('500/');
  },
  apiTestDisplay() {
    return pathKeys.root.concat('api-test/');
  },
  places: new PatchCrud('places'),
  languages: new PatchCrud('languages', 'thesaurus'),
};
