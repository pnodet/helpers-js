/**
 * Checks if `string` starts with the given target string.
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _String.startsWith('abc', 'a')
 * // => true
 *
 * _String.startsWith('abc', 'b')
 * // => false
 *
 * _String.startsWith('abc', 'b', 1)
 * // => true
 */
export function startsWith(string?: string, target?: string, position?: number): boolean;
/**
 * Checks if `string` ends with the given target string.
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * _String.endsWith('abc', 'c')
 * // => true
 *
 * _String.endsWith('abc', 'b')
 * // => false
 *
 * _String.endsWith('abc', 'b', 2)
 * // => true
 */
export function endsWith(string?: string, target?: string, position?: number): boolean;
/**
 * Repeats the given string `n` times.
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _String.repeat('*', 3)
 * // => '***'
 *
 * _String.repeat('abc', 2)
 * // => 'abcabc'
 *
 * _String.repeat('abc', 0)
 * // => ''
 */
export function repeat(string?: string, n?: number): string;
/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @example
 *
 * _String.replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 */
export function replace(...args: any[]): string;
export function sliceText(text: string, count: number): string;
export function isEmpty(s: string): boolean;
export function indexOf(st: string, search: string, fromIndex?: number, ignoreCase?: boolean): number;
export function isMail(value: string): boolean;
export function isUrl(value: string): boolean;
export function isImageUrl(url: string): boolean;
export function isPhone(value: string): boolean;
export function random(length?: number): string;
