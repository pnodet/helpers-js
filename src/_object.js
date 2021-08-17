/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

const toString = Object.prototype.toString;

/**
 * The function will be called with (key, value) as aruments
 * @param {Array | {}} object to traverse its members
 * @param {function} func The function
 */
export const forEachEntry = (object, func) => {
  if (!object || !func) return;

  if (Array.isArray(object)) {
    object.forEach((v, index) => {
      func(index, v);
    });
    return;
  }

  Object.entries(object).forEach((p) => func(p[0], p[1]));
};

/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @example
 *
 * function Foo() {
 *   this.a = () => 'a'
 *   this.b = () => 'b'
 * }
 *
 * Foo.prototype.c = () => 'c'
 *
 * functions(new Foo)
 * // => ['a', 'b']
 */
export function functions(object) {
  if (object == null) {
    return [];
  }
  return Object.keys(object).filter((key) => typeof object[key] === "function");
}

/**
 * Checks if `key` is a direct property of `object`.
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 */
export const has = (object, key) =>
  object != null && hasOwnProperty.call(object, key);

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invert(object)
 * // => { '1': 'c', '2': 'b' }
 */
export function invert(object) {
  const result = {};
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value != null && typeof value.toString !== "function") {
      value = toString.call(value);
    }
    result[value] = key;
  });
  return result;
}

/**
 * This method is like `invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 * @param {Object} object The object to invert.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invertBy(object, value => `group${value}`)
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
export function invertBy(object, iteratee) {
  const result = {};
  Object.keys(object).forEach((key) => {
    const value = iteratee(object[key]);
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  });
  return result;
}
