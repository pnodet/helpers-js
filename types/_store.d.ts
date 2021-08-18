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
    storage: {};
    /**
     * @param {string} key
     * @returns {*} value
     */
    getByKey(key: string): any;
    /**
     * @param {string} key
     * @param {*} value
     */
    setByKey(key: string, value: any): void;
    clear(): void;
}
