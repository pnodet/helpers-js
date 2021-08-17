/** Detect free variable `globalThis` */
const freeGlobalThis =
  typeof globalThis === "object" &&
  globalThis !== null &&
  globalThis.Object == Object &&
  globalThis;

/** Detect free variable `global` from Node.js. */
const freeGlobal =
  typeof global === "object" &&
  global !== null &&
  global.Object === Object &&
  global;

/** Detect free variable `self`. */
const freeSelf =
  typeof self === "object" && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
const root =
  freeGlobalThis || freeGlobal || freeSelf || Function("return this")();

/** Detect free variable `exports`. */
const freeExports =
  typeof exports === "object" &&
  exports !== null &&
  !exports.nodeType &&
  exports;

/** Detect free variable `module`. */
const freeModule =
  freeExports &&
  typeof module === "object" &&
  module !== null &&
  !module.nodeType &&
  module;

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
const freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
const nodeTypes = (() => {
  try {
    /* Detect public `util.types` helpers for Node.js v10+. */
    /* Node.js deprecation code: DEP0103. */
    const typesHelper =
      freeModule && freeModule.require && freeModule.require("util").types;
    return typesHelper
      ? typesHelper
      : /* Legacy process.binding('util') for Node.js earlier than v10. */
        freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {}
})();

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag =
  /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;

/* Node.js helper references. */
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;
const nodeIsArrayBuffer = nodeTypes && nodeTypes.isArrayBuffer;
const nodeIsDate = nodeTypes && nodeTypes.isDate;
const nodeIsMap = nodeTypes && nodeTypes.isMap;
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp;
const nodeIsSet = nodeTypes && nodeTypes.isSet;

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/** Used for built-in method references. */
const toString = Object.prototype.toString;
const objectProto = Object.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const Buffer = moduleExports ? root.Buffer : undefined;
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/** Gets the `toStringTag` of `value`.*/
const getTag = (value) =>
  value == null
    ? value === undefined
      ? "[object Undefined]"
      : "[object Null]"
    : toString.call(value);

/** Checks if `value` is a valid array-like length.*/
const isLength = (value) =>
  typeof value === "number" &&
  value > -1 &&
  value % 1 == 0 &&
  value <= MAX_SAFE_INTEGER;

/**
 * Checks if `value` is `null` or `undefined`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _Is.nil(null)
 * // => true
 *
 * _Is.nil(NaN)
 * // => false
 */
const isNil = (value) => value == null;

/**
 * Checks if `value` is `null`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _Is.null(null)
 * // => true
 *
 * _Is.null(void 0)
 * // => false
 */
const isNull = (value) => value === null;

/**
 * Checks if `value` is `undefined`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _Is.undefined(void 0)
 * // => true
 *
 * _Is.undefined(null)
 * // => false
 */
const isUndefined = (value) => value === undefined;

/**
 * Checks if `value` is `defined`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `defined`, else `false`.
 * @example
 *
 * _Is.defined(void 0)
 * // => true
 *
 * _Is.defined(null)
 * // => false
 */
const isDefined = (value) => value !== undefined;

const isNode = () => typeof window !== "undefined";
const isThenable = (fn) => fn && isFunction(fn.then);
const isPromise = (fn) => isThenable(fn) && isFunction(fn.catch);

/**
 * Checks if `value` is likely a DOM element.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _Is.element(document.body)
 * // => true
 *
 * _Is.element('<body>')
 * // => false
 */
const isElement = (value) =>
  isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
// const isElement = (x) => x instanceof Element;

const isChildren = (x) => isString(x) || isArray(x) || isElement(x);
const isObserv = (obs) => isFunction(obs) && isFunction(obs.set);
const isEvent = (ev) => isFunction(ev.listen) && isFunction(ev.broadcast);
const isBrowser = () => ![typeof window, typeof document].includes("undefined");

const isArguments = (value) =>
  isObjectLike(value) && getTag(value) == "[object Arguments]";

const isString = (str) => typeof str === "string";

/**
 * Checks if `value` is classified as a `Function` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _Is.function(async () => {})
 * // => true
 * 
 * _Is.function(/abc/)
 * // => false
 */
const isFunction = (fn) => typeof fn === "function";

/**
 * Checks if `value` is a buffer.
 * @deprecated Do not use
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _Is.buffer(new Buffer(2))
 * // => true
 *
 * _Is.buffer(new Uint8Array(2))
 * // => false
 */
const isBuffer = () => nativeIsBuffer || (() => false);

// const isBoolean = (val) => typeof val === "boolean";
const isBoolean = (value) => {
  value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == "[object Boolean]");
};

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `Number.isFinite` method.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _Is.number(3)
 * // => true
 *
 * _Is.number('3')
 * // => false
 */
const isNumber = (value) =>
  typeof value === "number" ||
  (isObjectLike(value) && getTag(value) == "[object Number]");
// const isNum = (num) => typeof num === "number" && !isNaN(num);

const isFloat = (float) => isNum(float) && Math.floor(float) !== float;

const isInteger = (int) =>
  Number.isInteger(int) || (isNum(int) && Math.floor(int) === int);


/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _Is.object({})
 * // => true
 * 
 * _Is.object(null)
 * // => false
 */
const isObject = (value) =>
  value != null && (typeof value === "object" || typeof value === "function");
  //const isObj = (obj) => obj && typeof obj === "object";

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _Is.objectLike({})
 * // => true
 *
 * _Is.objectLike([1, 2, 3])
 * // => true
 */
const isObjectLike = (value) => typeof value === "object" && value !== null;

const isArray = () => Array.isArray || ((arr) => arr && arr.constructor === Array);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _Is.arrayLike([1, 2, 3])
 * // => true
 *
 * _Is.arrayLike('abc')
 * // => true
 *
 * _Is.arrayLike(Function)
 * // => false
 */
const isArrayLike = (value) =>
  value != null && typeof value !== "function" && isLength(value.length);
// const isArrayLike = (obj) => obj != null && typeof obj[Symbol.iterator] === "function";

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _Is.arrayLikeObject([1, 2, 3])
 * // => true
 *
 * _Is.arrayLikeObject('abc')
 * // => false
 *
 * _Is.arrayLikeObject(Function)
 * // => false
 */
const isArrayLikeObject = (value) => isObjectLike(value) && isArrayLike(value);

/**
 * Checks if `value` is classified as a `Map` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _Is.map(new Map)
 * // => true
 *
 * _Is.map(new WeakMap)
 * // => false
 */
const isMap = nodeIsMap
  ? (value) => nodeIsMap(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Map]";

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * _Is.weakmap(new WeakMap)
 * // => true
 *
 * _Is.weakmap(new Map)
 * // => false
 */
const isWeakMap = (value) =>
  isObjectLike(value) && getTag(value) == "[object WeakMap]";

/**
 * Checks if `value` is classified as a `Set` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _Is.set(new Set)
 * // => true
 *
 * _Is.set(new WeakSet)
 * // => false
 */
const isSet = nodeIsSet
  ? (value) => nodeIsSet(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Set]";

/**
 * Checks if `value` is classified as a `WeakSet` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * _Is.weakset(new WeakSet)
 * // => true
 *
 * _Is.weakset(new Set)
 * // => false
 */
const isWeakSet = (value) =>
  isObjectLike(value) && getTag(value) == "[object WeakSet]";

/**
 * Checks if `value` is classified as a `RegExp` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _Is.regexp(/abc/)
 * // => true
 *
 * _Is.regexp('/abc/')
 * // => false
 */
const isRegExp = nodeIsRegExp
  ? (value) => nodeIsRegExp(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object RegExp]";

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _Is.symbol(Symbol.iterator)
 * // => true
 *
 * _Is.symbol('abc')
 * // => false
 */
const isSymbol = (value) => {
  const type = typeof value;
  return (
    type == "symbol" ||
    (type === "object" && value != null && getTag(value) == "[object Symbol]")
  );
};

/**
 * Checks if `value` is likely a prototype object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
const isPrototype = (value) => {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;
  return value === proto;
};

/**
 * Checks if `value` is classified as a typed array.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _Is.typedarray(new Uint8Array)
 * // => true
 *
 * _Is.typedarray([])
 * // => false
 */
const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value));

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * _Is.arraybuffer(new ArrayBuffer(2))
 * // => true
 *
 * _Is.arraybuffer(new Array(2))
 * // => false
 */
const isArrayBuffer = nodeIsArrayBuffer
  ? (value) => nodeIsArrayBuffer(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object ArrayBuffer]";

/**
 * Checks if `value` is classified as a `Date` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _Is.date(new Date)
 * // => true
 *
 * _Is.date('Mon April 23 2012')
 * // => false
 */
const isDate = nodeIsDate
  ? (value) => nodeIsDate(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Date]";

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * _Is.plainobject(new Foo)
 * // => false
 *
 * _Is.plainobject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * _Is.plainobject(Object.create(null))
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _Is.empty(true)
 * // => true
 *
 * _Is.empty(1)
 * // => true
 *
 * _Is.empty([1, 2, 3])
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag == "[object Map]" || tag == "[object Set]") {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _Is.error(new Error)
 * // => true
 *
 * _Is.error(Error)
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  const tag = getTag(value);
  return (
    tag == "[object Error]" ||
    tag == "[object DOMException]" ||
    (typeof value.message === "string" &&
      typeof value.name === "string" &&
      !isPlainObject(value))
  );
}

const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const isPrimitive = (prim) => {
  switch (typeof prim) {
    case "string":
    case "number":
    case "boolean":
      return true;
    default:
      return false;
  }
};

const is = {
  isNil,
  isNull,
  isUndefined,
  isDefined,
  isNode,
  isThenable,
  isPromise,
  isElement,
  isChildren,
  isObserv,
  isEvent,
  isBrowser,
  isArguments,
  isString,
  isFunction,
  isBuffer,
  isBoolean,
  isNumber,
  isFloat,
  isInteger,
  isObject,
  isObjectLike,
  isArray,
  isArrayLike,
  isArrayLikeObject,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isRegExp,
  isSymbol,
  isPrototype,
  isTypedArray,
  isArrayBuffer,
  isDate,
  isPlainObject,
  isEmpty,
  isError,
  isJSON,
  isPrimitive,
};

// const is = (type, val) => ![, null].includes(val) && val.constructor === type;
Object.keys(is).forEach((key) => (is[key.slice(2).toLowerCase()] = is[key]));

export default is;
