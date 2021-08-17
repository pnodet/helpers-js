/**
 * Execute promise in sequence
 * @param {[]} getters
 * @param {Number} [concurrent]
 */ 
export function executeGetters(getters, concurrent = 1) {
  let stopped;
  const promise = new Promise(async function (resolve, reject) {
    const chunks = splitArray(getters, concurrent);
    const promises = [];
    for (const chunk of chunks) {
      const chunkPromises = chunk.map((v) => v());
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
export function Timeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    let t, rejected;
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
      const e = new Error("Promise timeout!");
      e.name = "timeout";
      reject(e);
    }, timeout);
  });
}
