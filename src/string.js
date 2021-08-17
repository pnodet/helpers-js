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
