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

export const veryRarely = () => Number(Math.random > 0.9);
export const rarely = () => Number(Math.random > 0.75);
export const coinFlip = () => Number(Math.random > 0.5);

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

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;

/**
 * Converts `value` to a finite number.
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
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
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
export function toInteger(value) {
  const result = toFinite(value);
  const remainder = result % 1;
  return remainder ? result - remainder : result;
}

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toLength(3.2)
 * // => 3
 *
 * toLength(Number.MIN_VALUE)
 * // => 0
 *
 * toLength(Infinity)
 * // => 4294967295
 *
 * toLength('3.2')
 * // => 3
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

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toSafeInteger(3.2)
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 * toSafeInteger('3.2')
 * // => 3
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
const base = (chars) => {
  const max = chars.length;
  const baseLoop = (num, res = "") => {
    const mod = num % max;
    const remaining = Math.floor(num / max);
    const c = chars[mod] + res;
    return remaining <= 0 ? c : baseLoop(remaining, c);
  };
  return baseLoop;
};

const _chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Number to Base 64 */
const safe64 = base(`${_chars}-_`);

/** Number to Base 64 */
const base64 = base(`${_chars}+/`);

export { safe64, base64 };

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
const _pad = "0000000000000000000000000000000";
const pad = (uuid) =>
  uuid.length < 32 ? _pad.slice(0, 32 - uuid.length) + uuid : uuid;
