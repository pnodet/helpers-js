/**
 * Converts `value` to a finite number.
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _Number.toFinite(3.2)
 * // => 3.2
 *
 * _Number.toFinite(Infinity)
 * // => 1.7976931348623157e+308
 */
export function toFinite(value: any): number;
/**
 * Converts `value` to an integer.
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @see isInteger, isNumber, toNumber
 * @example
 *
 * _Number.toInteger(3.2)
 * // => 3
 *
 * _Number.toInteger(Infinity)
 * // => 1.7976931348623157e+308
 */
export function toInteger(value: any): number;
/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _Number.toLength(3.2)
 * // => 3
 *
 * _Number.toLength(Infinity)
 * // => 4294967295
 */
export function toLength(value: any): number;
/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _Number.toSafeInteger(3.2)
 * // => 3
 *
 * _Number.toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 */
export function toSafeInteger(value: any): number;
export function veryRarely(): number;
export function rarely(): number;
export function coinFlip(): number;
export function notLessThan(n: number, min: number): number;
export function notGreaterThan(n: number, max: number): number;
export function getRandomIntInclusive(min: number, max?: number): number;
export function between(delta: number, a: number, b: number): boolean;
export function safe64(num: any, res?: string): any;
export function base64(num: any, res?: string): any;
export function getUUID(): string;
