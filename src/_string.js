/**
 * @param {String} text the text to slice
 * @param {Number} count how many characters to keep
 */
export const sliceText = (text, count) =>
  text.slice(0, count) + (text.length > count ? "..." : "");

/**
 * Check if given string is undefined, null, or zero length
 * @param {String} s
 */
export const isEmpty = (s) => s === undefined || s === null || s === "";

/**
 * Find the index of a given string inside another
 * @param {String} st The string to search
 * @param {String} search The string to look for
 * @param {Integer default 0} fromIndex Starting index in st
 * @param {Boolean defaule false} ignoreCase is the search case sensitive or not
 * @returns the index of search if found. -1 if not found.
 */
export const indexOf = (st, search, fromIndex = 0, ignoreCase = false) => {
  if (!st) return -1;
  if (ignoreCase) {
    return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
  }
  return st.indexOf(search, fromIndex);
};

/**
 * Checks if `string` starts with the given target string.
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * startsWith('abc', 'a')
 * // => true
 *
 * startsWith('abc', 'b')
 * // => false
 *
 * startsWith('abc', 'b', 1)
 * // => true
 */
export function startsWith(string, target, position) {
  const { length } = string;
  position = position == null ? 0 : position;
  if (position < 0) {
    position = 0;
  } else if (position > length) {
    position = length;
  }
  target = `${target}`;
  return string.slice(position, position + target.length) == target;
}

/**
 * Checks if `string` ends with the given target string.
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 */
export function endsWith(string, target, position) {
  const { length } = string;
  position = position === undefined ? length : +position;
  if (position < 0 || position != position) {
    position = 0;
  } else if (position > length) {
    position = length;
  }
  const end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}

/**
 * Repeats the given string `n` times.
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * repeat('*', 3)
 * // => '***'
 *
 * repeat('abc', 2)
 * // => 'abcabc'
 *
 * repeat('abc', 0)
 * // => ''
 */
export function repeat(string, n) {
  let result = "";
  if (!string || n < 1 || n > Number.MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string;
    }
    n = Math.floor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);

  return result;
}

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
 * replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 */
export function replace(...args) {
  const string = `${args[0]}`;
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}
