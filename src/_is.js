/* globals window, document, HTMLElement */
/* eslint-disable promise/prefer-await-to-then */

const objectProto = Object.prototype;
const owns = objectProto.hasOwnProperty;
const toString_ = objectProto.toString;

const NON_HOST_TYPES = {
  boolean: 1,
  number: 1,
  string: 1,
  undefined: 1,
};

const base64Regex =
  /^([A-Za-z\d+/]{4})*([A-Za-z\d+/]{4}|[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)$/;
const hexRegex = /^[A-Fa-f\d]+$/;

/**
 * Expose `is`
 */

const is = {};

/**
 * Test general.
 */

/**
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 */
is.a = (value, type) => typeof value === type;

/**
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 */
is.type = (value, type) => typeof value === type;

/**
 * Test if `value` is defined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 */
is.defined = value => typeof value !== 'undefined';

/**
 * Test if `value` is empty.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 */
is.empty = value => {
  const type = toString_.call(value);
  let key;

  if (
    type === '[object Array]' ||
    type === '[object Arguments]' ||
    type === '[object String]'
  ) {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  return !value;
};

/**
 * Test if `value` is hosted by `host`.
 *
 * @param {*} value to test
 * @param {*} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 */
is.hosted = (value, host) => {
  const type = typeof host[value];
  return type === 'object' ? Boolean(host[value]) : !NON_HOST_TYPES[type];
};

/**
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 */
is.instance = (value, constructor) => value instanceof constructor;

/**
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 */
is.instanceof = (value, constructor) => value instanceof constructor;

/**
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 */
is.nil = value => value === null;

/**
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 */
is.null = value => value === null;

/**
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 */
is.undef = value => typeof value === 'undefined';

/**
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 */
is.undefined = value => typeof value === 'undefined';

/**
 * Test arguments.
 */

/**
 * Test if `value` is an arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 */
is.args = value => {
  const isStandardArguments = toString_.call(value) === '[object Arguments]';
  const isOldArguments =
    !is.array(value) &&
    is.arraylike(value) &&
    is.object(value) &&
    is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test if `value` is an arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 */
is.arguments = value => {
  const isStandardArguments = toString_.call(value) === '[object Arguments]';
  const isOldArguments =
    !is.array(value) &&
    is.arraylike(value) &&
    is.object(value) &&
    is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test if `value` is an empty arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 */
is.args.empty = value => is.args(value) && value.length === 0;

/**
 * Test array.
 */

/**
 * Test if 'value' is an array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 */
is.array = value =>
  Array.isArray(value) || toString_.call(value) === '[object Array]';

/**
 * Test if `value` is an empty array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 */
is.array.empty = value => is.array(value) && value.length === 0;

/**
 * Test if `value` is an arraylike object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 */
is.arraylike = value =>
  Boolean(value) &&
  !is.bool(value) &&
  owns.call(value, 'length') &&
  Number.isFinite(value.length) &&
  is.number(value.length) &&
  value.length >= 0;

/**
 * Test boolean.
 */

/**
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 */
is.bool = value => toString_.call(value) === '[object Boolean]';

/**
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 */
is.boolean = value => toString_.call(value) === '[object Boolean]';

/**
 * Test if `value` is false.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 */
is.false = value => is.bool(value) && Boolean(Number(value)) === false;

/**
 * Test if `value` is true.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 */
is.true = value => is.bool(value) && Boolean(Number(value)) === true;

/**
 * Test date.
 */

/**
 * Test if `value` is a date.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 */
is.date = value => toString_.call(value) === '[object Date]';

/**
 * Test if `value` is a valid date.
 *
 * @param {*} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
is.date.valid = value => is.date(value) && !Number.isNaN(Number(value));

/**
 * Test element.
 */

/**
 * Test if `value` is an html element.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 */
is.element = value =>
  value !== undefined &&
  typeof HTMLElement !== 'undefined' &&
  value instanceof HTMLElement &&
  value.nodeType === 1;

/**
 * Test error.
 */

/**
 * Test if `value` is an error object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 */
is.error = value => toString_.call(value) === '[object Error]';

/**
 * Test function.
 */

/**
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 */
is.fn = value => typeof value === 'function';

/**
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 */
is.function = value => typeof value === 'function';

/**
 * Test if `value` is a function and `then` can be called
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a thenable function, false otherwise
 */
is.thenable = value => value && is.function(value.then);

/**
 * Test if `value` is a promise.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a promise, false otherwise
 */
is.promise = value => is.thenable(value) && is.function(value.catch);

/**
 * Test number.
 */

/**
 * Test if `value` is a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 */
is.num = value => toString_.call(value) === '[object Number]';

/**
 * Test if `value` is a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 */
is.number = value => toString_.call(value) === '[object Number]';

/**
 * Test if `value` is positive or negative infinity.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 */
is.infinite = value =>
  value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;

/**
 * Test if `value` is a decimal number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 */
is.decimal = value =>
  is.num(value) &&
  !is.infinite(value) &&
  !Number.isNaN(value) &&
  value % 1 !== 0;

/**
 * Test if `value` is an integer.Number.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 */
is.int = value => is.num(value) && !Number.isNaN(value) && value % 1 === 0;

/**
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 */
is.integer = value => is.num(value) && !Number.isNaN(value) && value % 1 === 0;

/**
 * Test if `value` is a 'safe' integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is a 'safe' integer, false otherwise
 */
is.safeInteger = value => Number.isSafeInteger(value) && !Number.isNaN(value);

/**
 * Test if `value` is a BigInt
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a BigInt, false otherwise
 */
is.bigInt = value => typeof value === 'bigint';

/**
 * Test if `value` is a float.
 *
 * @param value to test
 * @return {Boolean} true if `value` is a float, false otherwise
 */
is.float = value =>
  is.number(value) && !Number.isNaN(value) && Math.floor(value) !== value;

/**
 * Test if `value` is not a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 */
is.nan = value => !is.number(value) || Number.isNaN(value);

/**
 * Test object.
 */

/**
 * Test if `value` is an object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 */
is.object = value => toString_.call(value) === '[object Object]';

/**
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 */
is.primitive = value => {
  if (!value) {
    return true;
  }

  if (
    typeof value === 'object' ||
    is.object(value) ||
    is.fn(value) ||
    is.array(value)
  ) {
    return false;
  }

  return true;
};

/**
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 */
is.hash = value =>
  is.object(value) &&
  value.constructor === Object &&
  !value.nodeType &&
  !value.setInterval;

/**
 * Test regexp.
 */

/**
 * Test if `value` is a regular expression.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 */
is.regexp = value => toString_.call(value) === '[object RegExp]';

/**
 * Test string.
 */

/**
 * Test if `value` is a string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 */
is.string = value => toString_.call(value) === '[object String]';

/**
 * Test base64 string.
 */

/**
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 */
is.base64 = value =>
  is.string(value) && (value.length === 0 || base64Regex.test(value));

/**
 * Test hex string.
 */

/**
 * Test if `value` is a valid hex encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 */
is.hex = value =>
  is.string(value) && (value.length === 0 || hexRegex.test(value));

/**
 * Test if `value` is a Symbol
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherwise
 */
is.symbol = value => typeof value === 'symbol';

/**
 * Test if `value` is a prototype
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a prototype, false otherwise
 */
is.prototype = value => {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
  return value === proto;
};

/**
 * Test if `value` is an event.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an event, false otherwise
 */
is.event = value => is.function(value.listen) && is.function(value.broadcast);

/**
 * Test if `value` is a Map
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Map, false otherwise
 */
is.map = value => value instanceof Map;

/**
 * Test if `value` is a WeakMap
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a WeakMap, false otherwise
 */
is.weakMap = value => value instanceof WeakMap;

/**
 * Test if `value` is a Set
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Set, false otherwise
 */
is.set = value => value instanceof Set;

/**
 * Test if `value` is a WeakSet
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a WeakSet, false otherwise
 */
is.weakSet = value => value instanceof WeakSet;

/**
 * Test if `env` is Node
 *
 * @return {Boolean} true if `env` is Node, false otherwise
 */
is.node = () => typeof window !== 'undefined';

/**
 * Test if `env` is Browser
 *
 * @return {Boolean} true if `env` is Browser, false otherwise
 */
is.browser = () => ![typeof window, typeof document].includes('undefined');

export default is;
