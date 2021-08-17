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
  const { length } = string
  position = position === undefined ? length : +position
  if (position < 0 || position != position) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  const end = position
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}
