/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _Func.delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */
export function delay(func, wait, ...args) {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  return setTimeout(func, +wait || 0, ...args);
}

const isFunc = (obj) => this.getType(obj) === "function";

/**
 * @param {*} func The function to run.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {boolean} is it safe?
 */
export function safelyRun(func, ...args) {
  let result = null;

  if (isFunc(func)) {
    result = func(...args);
  }

  return result;
}

/**
 * Returns a function that will only run N milliseconds after it stops being called.
 * Or optionally will only run once during multiple calls,
 * and won't run again until N milliseconds after the last call.
 * @link https://code.area17.com/a17/a17-helpers/wikis/debounce
 *
 * @example
 * clicked = _Func.debounce(function() {
 *   // function to run on first click,
 *   // but won't run again until clicking has stopped for 1000ms
 * }, 1000, true);
 * document.addEventListener('click', clicked);
 */
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0
 * }
 *
 * filter([1, 2, 3, 4, 5, 6], _Func.negate(isEven))
 * // => [1, 3, 5]
 */
export function negate(predicate) {
  if (typeof predicate !== "function") {
    throw new TypeError("Expected a function");
  }
  return function (...args) {
    return !predicate.apply(this, args);
  };
}

/**
 * Creates a function that invokes `func` with its arguments transformed.
 * @param {Function} func The function to wrap.
 * @param {Function[]} transforms
 *  The argument transforms.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2
 * }
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const func = _Func.overArgs((x, y) => [x, y], [square, doubled])
 *
 * func(9, 3)
 * // => [81, 6]
 *
 * func(10, 5)
 * // => [100, 10]
 */
export function overArgs(func, transforms) {
  const funcsLength = transforms.length;
  return function (...args) {
    let index = -1;
    const length = Math.min(args.length, funcsLength);
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return func.apply(this, args);
  };
}

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _Func.times(3, String)
 * // => ['0', '1', '2']
 *
 *  _Func.times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
export const times = (n, iteratee) => {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  let index = -1;
  const length = Math.min(n, MAX_ARRAY_LENGTH);
  const result = new Array(length);
  while (++index < length) {
    result[index] = iteratee(index);
  }
  index = MAX_ARRAY_LENGTH;
  n -= MAX_ARRAY_LENGTH;
  while (++index < n) {
    iteratee(index);
  }
  return result;
};
