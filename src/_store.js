/* eslint-disable */
/**
 * Store is a helper method used to share information accross integration tests.
 * If set up as a sinlgeton it can share information across different files.
 *
 * @method getByKey Get stored value by key
 * @method setByKey Store a value with a key
 * @method clear Clears storage.
 *
 * @example
 * const storage = new _Store();
 * const response = await logUserIn();
 * storage.setByKey('token', extractToken(response));
 */
export default class _Store {
  constructor() {
    this.storage = {};
  }

  /**
   * @param {string} key
   * @returns {*} value
   */
  getByKey(key) {
    let result;
    result = this.storage[key];
    if (!result) {
      console.error(`Unable to get [${key}] from store.`);
    }
    return result;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  setByKey(key, value) {
    if (!key || !value) {
      console.error('store:', 'Key or value not set.');
      return;
    }
    this.storage[key] = value;
  }

  clear() {
    this.storage = {};
  }
}
