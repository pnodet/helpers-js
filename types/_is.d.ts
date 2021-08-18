export default is;
declare namespace is {
    export { isNil };
    export { isNull };
    export { isUndefined };
    export { isDefined };
    export { isNode };
    export { isThenable };
    export { isPromise };
    export { isElement };
    export { isChildren };
    export { isObserv };
    export { isEvent };
    export { isBrowser };
    export { isArguments };
    export { isString };
    export { isFunction };
    export { isBuffer };
    export { isBoolean };
    export { isNumber };
    export { isFloat };
    export { isInteger };
    export { isObject };
    export { isObjectLike };
    export { isArray };
    export { isArrayLike };
    export { isArrayLikeObject };
    export { isMap };
    export { isWeakMap };
    export { isSet };
    export { isWeakSet };
    export { isRegExp };
    export { isSymbol };
    export { isPrototype };
    export { isTypedArray };
    export { isArrayBuffer };
    export { isDate };
    export { isPlainObject };
    export { isEmpty };
    export { isError };
    export { isJSON };
    export { isPrimitive };
}
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
declare function isNil(value: any): boolean;
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
declare function isNull(value: any): boolean;
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
declare function isUndefined(value: any): boolean;
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
declare function isDefined(value: any): boolean;
declare function isNode(): boolean;
declare function isThenable(fn: any): boolean;
declare function isPromise(fn: any): boolean;
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
declare function isElement(value: any): boolean;
declare function isChildren(x: any): boolean | ((arr: any) => boolean);
declare function isObserv(obs: any): boolean;
declare function isEvent(ev: any): boolean;
declare function isBrowser(): boolean;
declare function isArguments(value: any): boolean;
declare function isString(str: any): boolean;
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
declare function isFunction(fn: any): boolean;
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
declare function isBuffer(): boolean;
declare function isBoolean(value: any): void;
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
declare function isNumber(value: any): boolean;
declare function isFloat(float: any): boolean;
declare function isInteger(int: any): boolean;
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
declare function isObject(value: any): boolean;
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
declare function isObjectLike(value: any): boolean;
declare function isArray(): (arr: any) => boolean;
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
declare function isArrayLike(value: any): boolean;
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
declare function isArrayLikeObject(value: any): boolean;
declare function isMap(value: any): any;
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
declare function isWeakMap(value: any): boolean;
declare function isSet(value: any): any;
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
declare function isWeakSet(value: any): boolean;
declare function isRegExp(value: any): any;
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
declare function isSymbol(value: any): boolean;
/**
 * Checks if `value` is likely a prototype object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
declare function isPrototype(value: any): boolean;
declare function isTypedArray(value: any): any;
declare function isArrayBuffer(value: any): any;
declare function isDate(value: any): any;
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
declare function isPlainObject(value: any): boolean;
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
declare function isEmpty(value: any): boolean;
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
declare function isError(value: any): boolean;
declare function isJSON(str: any): boolean;
declare function isPrimitive(prim: any): boolean;
