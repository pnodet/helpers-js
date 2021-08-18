/* eslint-disable */
/**
 * Execute promise in sequence
 * @param {[]} getters
 * @param {Number} [concurrent]
 */
export function executeGetters(getters, concurrent = 1) {
  let stopped;
  const promise = new Promise(async (resolve, reject) => {
    const chunks = splitArray(getters, concurrent);
    const promises = [];
    for (const chunk of chunks) {
      const chunkPromises = chunk.map(v => v());
      promises.push(...chunkPromises);
      await Promise.all(chunkPromises);
      if (stopped) {
        break;
      }
    }
    Promise.all(promises).then((...args) => {
      resolve(...args);
    });
  });
  return {
    promise,
    stop() {
      stopped = true;
    },
  };
}

/**
 * Try execute promise while timeout
 * @param {Promise} promise
 * @param {Number} timeout
 */
export function timeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    let t;
    let rejected;
    promise.then(
      (...args) => {
        clearTimeout(t);
        resolve(...args);
      },
      (...args) => {
        if (!rejected) {
          clearTimeout(t);
          reject(...args);
        }
      }
    );
    t = setTimeout(() => {
      rejected = true;
      const e = new Error('Promise timeout!');
      e.name = 'timeout';
      reject(e);
    }, timeout);
  });
}

/**
 * Simplified asynchronous requests
 * @param {Promise} promise
 * @example
 *
 * const [err, result] = await _Promise.tryC(asyncMethod());
 * if (err) return errorResponse(err, 'An error occured...');
 * return successResponse(result);
 */
export const tryC = promise =>
  promise.then(data => [null, data]).catch(err => [err]);

/**
 * Resolves promises in a sequential order
 * and returns an array with its results.
 * @param {...Promise} promises
 * @returns {[]}
 *
 * @example
 *
 * const expected = [150, 700, 100, 50];
 * const promises = [_Func.mock(150), _Func.mock(700), _Func.mock(100), _Func.mock(50)];
 * const result = await _Promise.chain(promises);
 * expect(result).toEqual(expected);
 */
export function chain(promises) {
  return promises
    .reduce(
      (promiseChain, currentTask) =>
        promiseChain.then(chainResults =>
          currentTask
            .then(currentResult => [...chainResults, currentResult])
            .catch(e => {
              throw e;
            })
        ),
      Promise.resolve([])
    )
    .then(arrayOfResults => arrayOfResults);
}
