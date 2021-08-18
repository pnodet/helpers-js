/**
 * Returns an object composed from key-value `pairs`.
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _Array.fromEntries([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 */
export function fromEntries(pairs: any[]): any;
/**
 * Gets the first element of `array`.
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _Array.head([1, 2, 3])
 * // => 1
 *
 * _Array.head([])
 * // => undefined
 */
export function head(array: any[]): any;
/**
 * Gets the last element of `array`.
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _Array.last([1, 2, 3])
 * // => 3
 */
export function last(array: any[]): any;
/**
 * Gets all but the first element of `array`.
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _Array.tail([1, 2, 3])
 * // => [2, 3]
 */
export function tail(array: any[]): any[];
/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * _Array.map([4, 8], square)
 * // => [16, 64]
 */
export function map(array: any[], iteratee: Function): any[];
/**
 * Gets a random element from `array`.
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _Array.sample([1, 2, 3, 4])
 * // => 2
 */
export function sample(array: any[]): any;
/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 * **Note:** This method is used instead of [`Array#slice`](https://mdn.io/Array/slice)
 * to ensure dense arrays are returned.
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [stop=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * let array = [1, 2, 3, 4]
 *
 * _Array.slice(array, 2)
 * // => [3, 4]
 */
export function slice(array: any[], start?: number, stop?: number): any[];
export function countOccurrences(arr: any[], val: any): number;
export function compact(arr: any[]): any[];
export function cast(val: any): any[];
export function append(arr: any[], val: any): any[];
export function prepend(arr: any[], val: any): any[];
export function toCSV(arr: any[], delimiter?: string): string;
export function all(arr: any[], fn: Function): boolean;
export function allEqual(arr: any[]): boolean;
export function similarity(arr: any[], values: any[]): any[];
export function average(...nums: number[]): number;
export function flatten(arr: any[], depth?: number): any[];
export function deepFlatten(arr: any[]): any[];
export function sortBy(arr: any[], p: any): any[];
export function unDuplicate(arr: any[]): any[];
export function random(arr: any[]): any;
export function remove(arr: any[], elem: any): void;
export function toChunks(arr: any[], limit?: number): any[];
export function groupMap(arr: any[], fn: any): {};
export function group(arr: any[], fn: any): unknown[];
export function shuffle(array: any[]): any[];
