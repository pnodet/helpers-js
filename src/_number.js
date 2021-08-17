/**
 * Get a number bewteen two values.
 * @param {number} min
 * @param {number} max
 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const veryRarely = () => Number(Math.random > 0.9);
export const rarely = () => Number(Math.random > 0.75);
export const coinFlip = () => Number(Math.random > 0.5);


/**
 * Is this number between a and b ?
 * @param {number} delta
 * @param {number} a min
 * @param {number} b max
 * @return {Boolean}
 */ 
export const between = (delta, a, b) => {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return delta > min && delta < max;
};
