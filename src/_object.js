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
 * _Object.functions(new Foo)
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
 * _Object.has(object, 'a')
 * // => true
 *
 * _Object.has(other, 'a')
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
 * _Object.invert(object)
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
 * _Object.invertBy(object, value => `group${value}`)
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

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 * @static
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _Object..keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
export function keysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  return result;
}

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * const users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * }
 *
 * _Object.mapValue(users, ({ age }) => age)
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
export function mapValue(object, iteratee) {
  object = Object(object);
  const result = {};

  Object.keys(object).forEach((key) => {
    result[key] = iteratee(object[key], key, object);
  });
  return result;
}

/**
 * The opposite of `mapValue` this method creates an object with the
 * same values as `object` and keys generated by running each own enumerable
 * string keyed property of `object` thru `iteratee`. The iteratee is invoked
 * with three arguments: (value, key, object).
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * _Object.mapKey({ 'a': 1, 'b': 2 }, function(value, key) {
 *   return key + value
 * })
 * // => { 'a1': 1, 'b2': 2 }
 */
export function mapKey(object, iteratee) {
  object = Object(object);
  const result = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];
    result[iteratee(value, key, object)] = value;
  });
  return result;
}

/**
 * Creates an array of values by running each property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments: (value, key, object).
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * _Object.mapObj({ 'a': 4, 'b': 8 }, square)
 * // => [16, 64] (iteration order is not guaranteed)
 */
export function mapObj(object, iteratee) {
  const props = Object.keys(object);
  const result = new Array(props.length);

  props.forEach((key, index) => {
    result[index] = iteratee(object[key], key, object);
  });
  return result;
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, _Object.toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
export function toPlainObject(value) {
  value = Object(value);
  const result = {};
  for (const key in value) {
    result[key] = value[key];
  }
  return result;
}
