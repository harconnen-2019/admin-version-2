/* eslint-disable unicorn/prefer-spread */
import { SlugPageParameters } from './react-router.types';

/**
 * Класс для создания путей CRUD для всех сущностей
 */
export class PatchCrud {
  protected readonly _root = '/';
  protected readonly _path;
  protected readonly _key;

  /**
   *
   * @param nameKey название папки
   * @param path дополнительный параметр (например название для группы)
   */
  constructor(nameKey: string, path?: string) {
    this._path = path;
    this._key = nameKey;
  }

  root() {
    return this._path
      ? this._root.concat(this._path, '/', this._key, '/')
      : this._root.concat(this._key, '/');
  }
  create() {
    return this.root().concat('create/');
  }
  edit({ id }: SlugPageParameters) {
    return this.root().concat(id, '/', 'edit/');
  }
}
