import packageJson from '../../../package.json';

export const VERSION = `версия ${packageJson.version}`;
export const DEBUG = process.env.NODE_ENV !== 'production';

export const BASE_URL = `${DEBUG ? 'http://localhost' : ''}/api/red`;
export const DEFAULT_PAGE_LIMIT = 30;

/**
 * Зарезервированные теги промтов
 */
export const PROMTS_SLUG = {
  seo_title: '',
  seo_description: '',
  feature_description: '',
  feature_list: '',
  feedback: '',
  faq: '',
};
