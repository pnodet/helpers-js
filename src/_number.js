/* eslint-disable */
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;
const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_ARRAY_LENGTH = 4294967295;

export const veryRarely = () => Number(Math.random > 0.9);
export const rarely = () => Number(Math.random > 0.75);
export const coinFlip = () => Number(Math.random > 0.5);

/**
 * If n less than `min`, return `min`, else n.
 * @param {number} n
 * @param {number} min
 */
export const notLessThan = (n, min) => (n < min ? min : n);

/**
 * If n greater than `max`, return `max`, else n.
 * @param {number} n
 * @param {number} max
 */
export const notGreaterThan = (n, max) => (n < max ? n : max);

/**
 * Get a number bewteen two values.
 * @param {number} min
 * @param {number} [max]
 */
export const getRandomIntInclusive = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Is this number between a and b ?
 * @param {number} delta
 * @param {number} a min
 * @param {number} b max
 * @return {Boolean}
 */
export const between = (delta, a, b) => {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return delta > min && delta < max;
};

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
export function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    const sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

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
export function toInteger(value) {
  const result = toFinite(value);
  const remainder = result % 1;
  return remainder ? result - remainder : result;
}

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
export function toLength(value) {
  if (!value) {
    return 0;
  }
  value = toInteger(value);
  if (value < 0) {
    return 0;
  }
  if (value > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH;
  }
  return value;
}

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
export function toSafeInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toInteger(value);
  if (value < -MAX_SAFE_INTEGER) {
    return -MAX_SAFE_INTEGER;
  }
  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }
  return value;
}

/** Number to Base 64 */
const base = chars => {
  const max = chars.length;
  const baseLoop = (num, res = '') => {
    const mod = num % max;
    const remaining = Math.floor(num / max);
    const c = chars[mod] + res;
    return remaining <= 0 ? c : baseLoop(remaining, c);
  };
  return baseLoop;
};

const _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/** Export Number to Base 64 */
export const safe64 = base(`${_chars}-_`);
export const base64 = base(`${_chars}+/`);

/**
 * UUID generator
 * @returns {String} The generated uuid
 */
export const getUUID = () =>
  pad(
    safe64(getRandomIntInclusive(Math.pow(64, 8))) +
      safe64(getRandomIntInclusive(Math.pow(64, 8))) +
      safe64(getRandomIntInclusive(Math.pow(64, 8))) +
      safe64(getRandomIntInclusive(Math.pow(64, 8)))
  );
const _pad = '0000000000000000000000000000000';
const pad = uuid =>
  uuid.length < 32 ? _pad.slice(0, 32 - uuid.length) + uuid : uuid;
