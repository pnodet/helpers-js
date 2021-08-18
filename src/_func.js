const isFunc = obj => this.getType(obj) === 'function';

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_ARRAY_LENGTH = 4294967295;

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
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return setTimeout(func, +wait || 0, ...args);
}

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
 * @param {Function} fn
 * @param {number} [interval] - time in milliseconds to wait until execution.
 * @param {Object} [options]
 * @param {boolean} [options.leading]
 *
 * @example
 * const debouncedFunction = _Func.debounce(checkPositionAndDoSomething(), 150);
 * window.addEventListener('scroll', debouncedFunction);
 */
export function debounce(fn, interval, {leading} = {}) {
  let timeout;
  let leadExecuted = false;
  const timer = typeof interval === 'number' ? interval : 200;
  const lead = typeof leading === 'boolean' ? leading : false;
  return (...args) => {
    const context = this;
    const postponed = () => {
      timeout = null;
      if (lead) {
        leadExecuted = false;
      } else {
        fn.apply(context, args);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(postponed, timer);
    if (lead && !leadExecuted) {
      leadExecuted = true;
      fn.apply(context, args);
    }
  };
}

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
  if (typeof predicate !== 'function') {
    throw new TypeError('Expected a function');
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

/**
 * @param {number} milliseconds The function to run.
 * @param {Function} [callback] The arguments to invoke `func` with.
 * @returns {Promise<Void>}
 */
export function waitTime(milliseconds, callback) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      callback && callback();
      resolve();
    }, milliseconds);
  });
}

/**
 * @param {Function} condition The function to try, returns a Boolean.
 * @param {Number} [time] time.
 * @param {Number} [maxTimes] max times.
 */
export function waitFor(condition, time = 100, maxTimes = 1000) {
  let interval;
  const promise = new Promise(function (resolve, reject) {
    let count = 0;
    function judge() {
      if (count <= maxTimes) {
        if (condition()) {
          stop();
          resolve();
        }
      } else {
        stop();
        reject(new Error('waitFor: Limit is reached'));
      }
      count++;
    }
    interval = setInterval(function () {
      judge();
    }, time);
    judge();
  });
  return {promise, stop};
  function stop() {
    clearInterval(interval);
  }
}

/**
 * @param {Function} func The function to run.
 * @param {Number} [limitTimes] Max retry number.
 * @param {...*} [args] Arguments to pass to the function
 */
export async function retry(func, limitTimes = 3, ...args) {
  for (let index = 1; index <= limitTimes; index++) {
    try {
      return await func(...args);
    } catch (error) {
      if (index === limitTimes) {
        throw error;
      }
    }
  }
}

/**
 * Mock promise, Useful for testing asynchronous functions.
 * @param {Number} time
 * @param {String | Function} response
 * @param {Boolean} fail
 *
 * @example
 * const expected = 100;
 * const result = await _Func.mock(100);
 * expect(result).toEqual(expected);
 * //=> Successfully resolved promise
 */
export function mock(time, response, fail = false) {
  let res;
  const t = typeof time === 'number' ? time : 50;

  if (typeof response !== 'function') {
    const ans = !response ? t : response;
    res = () => ans;
  } else {
    res = response;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(res());
      }
      return resolve(res());
    }, t);
  });
}

/**
 * asyncRetry is a method that encapsulates a retry logic for an asynchronous request.
 * Time between retries is defined by a function with customizable parameters for now.
 * In the future this will be updated in order to provide a custom function.
 * @param {Function} fn an async function
 * @param {Number} maxAttempts
 * @param {Object} [options]
 * @param {Number} [options.backoff]
 * @param {Number} [options.backoffPower]
 *
 * @example
 *
 * try {
 *   result = await _Func.asyncRetry(fetchData, 3, options);
 * } catch(e) {
 *   result = e;
 * }
 */
export const asyncRetry = async (
  fn,
  maxAttempts,
  options = {backoff: 2000, backoffPower: 1.25}
) => {
  const execute = async attempt => {
    try {
      return await fn();
    } catch (err) {
      if (attempt <= maxAttempts) {
        const nextAttempt = attempt + 1;
        const delayInSeconds = Math.round(
          (options.backoff * nextAttempt ** options.backoffPower) / 1000
        );
        console.warn(`Retrying after ${delayInSeconds} seconds due to:`, err);
        return mock(delayInSeconds * 1000, () => execute(nextAttempt));
      }
      throw err;
    }
  };
  return execute(1);
};

/**
 * mAsyncRequestFactory stands for mock asynchronous request factory.
 * It returns a function that returns promises upon execution.
 * If countdownToSuccess is larger than 0 it will throw executing/returning onFailure.
 * When countdownToSuccess reaches zero it will resolve promise successfully returning onSuccess.
 *
 * @param {Number | String | Function} onSuccess - is the value or function returned on success.
 * @param {Number | String | Function} onFailure - is the value or function returned when promise is rejected.
 * @param {Number} [countdownToSuccess] - is the amount of promises to reject before succeeding
 * @param {Number} [waitTime] - Amount of [ms] to wait until resolving or rejecting each promise.
 */
export const mockFactory = (
  onSuccess,
  onFailure,
  countdownToSuccess = 0,
  waitTime = 200
) => {
  let reminderTries = countdownToSuccess;
  return () => {
    reminderTries -= 1;
    if (reminderTries + 1 > 0) {
      return mock(waitTime, onFailure, true);
    }
    return mock(waitTime, onSuccess);
  };
};
