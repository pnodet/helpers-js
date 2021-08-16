/**
 * The function will be called with (key, value) as aruments
 * @param {Array | {}} object to traverse its members
 * @param {function} func The function
 */
const forEachEntry = (object, func) => {
  if (!object || !func) return;

  if (Array.isArray(object)) {
    object.forEach((v, index) => {
      func(index, v);
    });
    return;
  }

  Object.entries(object).forEach((p) => func(p[0], p[1]));
};

export default forEachEntry;
