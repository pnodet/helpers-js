/**
 * Execute promise in sequence
 * @param {[]} getters
 * @param {Number} [concurrent]
 */
export function executeGetters(getters: [], concurrent?: number): {
    promise: Promise<any>;
    stop(): void;
};
/**
 * Try execute promise while timeout
 * @param {Promise} promise
 * @param {Number} timeout
 */
export function timeout(promise: Promise<any>, timeout: number): Promise<any>;
/**
 * Resolves promises in a sequential order
 * and returns an array with its results.
 * @param {...Promise} promises
 * @returns {[]}
 *
 * @example
 *
 * const expected = [150, 700, 100, 50];
 * const promises = [_Func.mock(150), _Func.mock(700), _Func.mock(100), _Func.mock(50)];
 * const result = await _Promise.chain(promises);
 * expect(result).toEqual(expected);
 */
export function chain(promises: Promise<any>[]): [];
export function tryC(promise: Promise<any>): Promise<any[]>;
