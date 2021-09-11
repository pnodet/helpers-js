export default is;
declare namespace is {
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
    export function a(value: any, type: string): boolean;
    /**
     * Test if `value` is a type of `type`.
     *
     * @param {*} value value to test
     * @param {String} type type
     * @return {Boolean} true if `value` is a type of `type`, false otherwise
     */
    export function type(value: any, type: string): boolean;
    /**
     * Test if `value` is defined.
     *
     * @param {*} value value to test
     * @return {Boolean} true if 'value' is defined, false otherwise
     */
    export function defined(value: any): boolean;
    /**
     * Test if `value` is empty.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is empty, false otherwise
     */
    export function empty(value: any): boolean;
    /**
     * Test if `value` is hosted by `host`.
     *
     * @param {*} value to test
     * @param {*} host host to test with
     * @return {Boolean} true if `value` is hosted by `host`, false otherwise
     */
    export function hosted(value: any, host: any): boolean;
    /**
     * Test if `value` is an instance of `constructor`.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an instance of `constructor`
     */
    export function instance(value: any, constructor: any): boolean;
    /**
     * Test if `value` is an instance of `constructor`.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an instance of `constructor`
     */
    function _instanceof(value: any, constructor: any): boolean;
    export { _instanceof as instanceof };
    /**
     * Test if `value` is null.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is null, false otherwise
     */
    export function nil(value: any): boolean;
    /**
     * Test if `value` is null.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is null, false otherwise
     */
    function _null(value: any): boolean;
    export { _null as null };
    /**
     * Test if `value` is undefined.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is undefined, false otherwise
     */
    export function undef(value: any): boolean;
    /**
     * Test if `value` is undefined.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is undefined, false otherwise
     */
    export function undefined(value: any): boolean;
    /**
     * Test arguments.
     */
    /**
     * Test if `value` is an arguments object.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an arguments object, false otherwise
     */
    export function args(value: any): boolean;
    export namespace args {
        /**
         * Test if `value` is an empty arguments object.
         *
         * @param {*} value value to test
         * @return {Boolean} true if `value` is an empty arguments object, false otherwise
         */
        function empty(value: any): boolean;
    }
    /**
     * Test if `value` is an arguments object.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an arguments object, false otherwise
     */
    export function arguments(value: any): boolean;
    /**
     * Test array.
     */
    /**
     * Test if 'value' is an array.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an array, false otherwise
     */
    export function array(value: any): boolean;
    export namespace array {
        /**
         * Test if `value` is an empty array.
         *
         * @param {*} value value to test
         * @return {Boolean} true if `value` is an empty array, false otherwise
         */
        function empty(value: any): boolean;
    }
    /**
     * Test if `value` is an arraylike object.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an arguments object, false otherwise
     */
    export function arraylike(value: any): boolean;
    /**
     * Test boolean.
     */
    /**
     * Test if `value` is a boolean.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a boolean, false otherwise
     */
    export function bool(value: any): boolean;
    /**
     * Test if `value` is a boolean.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a boolean, false otherwise
     */
    export function boolean(value: any): boolean;
    /**
     * Test if `value` is false.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is false, false otherwise
     */
    function _false(value: any): boolean;
    export { _false as false };
    /**
     * Test if `value` is true.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is true, false otherwise
     */
    function _true(value: any): boolean;
    export { _true as true };
    /**
     * Test date.
     */
    /**
     * Test if `value` is a date.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a date, false otherwise
     */
    export function date(value: any): boolean;
    export namespace date {
        /**
         * Test if `value` is a valid date.
         *
         * @param {*} value value to test
         * @returns {Boolean} true if `value` is a valid date, false otherwise
         */
        function valid(value: any): boolean;
    }
    /**
     * Test element.
     */
    /**
     * Test if `value` is an html element.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an HTML Element, false otherwise
     */
    export function element(value: any): boolean;
    /**
     * Test error.
     */
    /**
     * Test if `value` is an error object.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an error object, false otherwise
     */
    export function error(value: any): boolean;
    /**
     * Test function.
     */
    /**
     * Test if `value` is a function.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a function, false otherwise
     */
    export function fn(value: any): boolean;
    /**
     * Test if `value` is a function.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a function, false otherwise
     */
    function _function(value: any): boolean;
    export { _function as function };
    /**
     * Test if `value` is a function and `then` can be called
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a thenable function, false otherwise
     */
    export function thenable(value: any): boolean;
    /**
     * Test if `value` is a promise.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a promise, false otherwise
     */
    export function promise(value: any): boolean;
    /**
     * Test number.
     */
    /**
     * Test if `value` is a number.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a number, false otherwise
     */
    export function num(value: any): boolean;
    /**
     * Test if `value` is a number.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a number, false otherwise
     */
    export function number(value: any): boolean;
    /**
     * Test if `value` is positive or negative infinity.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
     */
    export function infinite(value: any): boolean;
    /**
     * Test if `value` is a decimal number.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a decimal number, false otherwise
     */
    export function decimal(value: any): boolean;
    /**
     * Test if `value` is an integer.Number.
     *
     * @param value to test
     * @return {Boolean} true if `value` is an integer, false otherwise
     */
    export function int(value: any): boolean;
    /**
     * Test if `value` is an integer.
     *
     * @param value to test
     * @return {Boolean} true if `value` is an integer, false otherwise
     */
    export function integer(value: any): boolean;
    /**
     * Test if `value` is a 'safe' integer.
     *
     * @param value to test
     * @return {Boolean} true if `value` is a 'safe' integer, false otherwise
     */
    export function safeInteger(value: any): boolean;
    /**
     * Test if `value` is a BigInt
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a BigInt, false otherwise
     */
    export function bigInt(value: any): boolean;
    /**
     * Test if `value` is a float.
     *
     * @param value to test
     * @return {Boolean} true if `value` is a float, false otherwise
     */
    export function float(value: any): boolean;
    /**
     * Test if `value` is not a number.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is not a number, false otherwise
     */
    export function nan(value: any): boolean;
    /**
     * Test object.
     */
    /**
     * Test if `value` is an object.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an object, false otherwise
     */
    export function object(value: any): boolean;
    /**
     * Test if `value` is a primitive.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a primitive, false otherwise
     */
    export function primitive(value: any): boolean;
    /**
     * Test if `value` is a hash - a plain object literal.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a hash, false otherwise
     */
    export function hash(value: any): boolean;
    /**
     * Test regexp.
     */
    /**
     * Test if `value` is a regular expression.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a regexp, false otherwise
     */
    export function regexp(value: any): boolean;
    /**
     * Test string.
     */
    /**
     * Test if `value` is a string.
     *
     * @param {*} value value to test
     * @return {Boolean} true if 'value' is a string, false otherwise
     */
    export function string(value: any): boolean;
    /**
     * Test base64 string.
     */
    /**
     * Test if `value` is a valid base64 encoded string.
     *
     * @param {*} value value to test
     * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
     */
    export function base64(value: any): boolean;
    /**
     * Test hex string.
     */
    /**
     * Test if `value` is a valid hex encoded string.
     *
     * @param {*} value value to test
     * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
     */
    export function hex(value: any): boolean;
    /**
     * Test if `value` is a Symbol
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a Symbol, false otherwise
     */
    export function symbol(value: any): boolean;
    /**
     * Test if `value` is an event.
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is an event, false otherwise
     */
    export function event(value: any): boolean;
    /**
     * Test if `value` is a Map
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a Map, false otherwise
     */
    export function map(value: any): boolean;
    /**
     * Test if `value` is a WeakMap
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a WeakMap, false otherwise
     */
    export function weakMap(value: any): boolean;
    /**
     * Test if `value` is a Set
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a Set, false otherwise
     */
    export function set(value: any): boolean;
    /**
     * Test if `value` is a WeakSet
     *
     * @param {*} value value to test
     * @return {Boolean} true if `value` is a WeakSet, false otherwise
     */
    export function weakSet(value: any): boolean;
    /**
     * Test if `env` is Node
     *
     * @return {Boolean} true if `env` is Node, false otherwise
     */
    export function node(): boolean;
    /**
     * Test if `env` is Browser
     *
     * @return {Boolean} true if `env` is Browser, false otherwise
     */
    export function browser(): boolean;
}
