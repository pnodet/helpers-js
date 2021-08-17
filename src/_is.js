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

const isNil = (value) => value == null;
const isNull = (value) => value === null;
const isUndefined = (value) => value === undefined;
const isDefined = (value) => value !== undefined;
const isNode = () => typeof window !== "undefined";

const isThenable = (fn) => fn && isFunction(fn.then);
const isPromise = (fn) => isThenable(fn) && isFunction(fn.catch);

// const isElement = (x) => x instanceof Element;
const isElement = (value) =>
  isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);

const isChildren = (x) => isString(x) || isArray(x) || isElement(x);
const isObserv = (obs) => isFunction(obs) && isFunction(obs.set);
const isEvent = (ev) => isFunction(ev.listen) && isFunction(ev.broadcast);
const isBrowser = () => ![typeof window, typeof document].includes("undefined");

const isArguments = (value) =>
  isObjectLike(value) && getTag(value) == "[object Arguments]";

const isString = (str) => typeof str === "string";
const isFunction = (fn) => typeof fn === "function";
const isBuffer = () => nativeIsBuffer || (() => false);

// const isBoolean = (val) => typeof val === "boolean";
const isBoolean = (value) => {
  value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == "[object Boolean]");
};

// const isNum = (num) => typeof num === "number" && !isNaN(num);
const isNumber = (value) =>
  typeof value === "number" ||
  (isObjectLike(value) && getTag(value) == "[object Number]");

const isFloat = (float) => isNum(float) && Math.floor(float) !== float;

const isInteger = (int) =>
  Number.isInteger(int) || (isNum(int) && Math.floor(int) === int);

//const isObj = (obj) => obj && typeof obj === "object";
const isObject = (value) =>
  value != null && (typeof value === "object" || typeof value === "function");

const isObjectLike = (value) => typeof value === "object" && value !== null;

const isArray = () =>
  Array.isArray || ((arr) => arr && arr.constructor === Array);

// const isArrayLike = (obj) => obj != null && typeof obj[Symbol.iterator] === "function";
const isArrayLike = (value) =>
  value != null && typeof value !== "function" && isLength(value.length);

const isArrayLikeObject = (value) => isObjectLike(value) && isArrayLike(value);

const isMap = nodeIsMap
  ? (value) => nodeIsMap(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Map]";

const isWeakMap = (value) =>
  isObjectLike(value) && getTag(value) == "[object WeakMap]";

const isSet = nodeIsSet
  ? (value) => nodeIsSet(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Set]";

const isWeakSet = (value) =>
  isObjectLike(value) && getTag(value) == "[object WeakSet]";

const isRegExp = nodeIsRegExp
  ? (value) => nodeIsRegExp(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object RegExp]";

const isSymbol = (value) => {
  const type = typeof value;
  return (
    type == "symbol" ||
    (type === "object" && value != null && getTag(value) == "[object Symbol]")
  );
};

const isPrototype = (value) => {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;
  return value === proto;
};

const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value));

const isArrayBuffer = nodeIsArrayBuffer
  ? (value) => nodeIsArrayBuffer(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object ArrayBuffer]";

const isDate = nodeIsDate
  ? (value) => nodeIsDate(value)
  : (value) => isObjectLike(value) && getTag(value) == "[object Date]";

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
