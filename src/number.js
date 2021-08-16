/**
 * Get a number bewteen two values.
 * @param {number} min
 * @param {number} max
 */
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const veryRarely = () => Number(Math.random > 0.9);
const rarely = () => Number(Math.random > 0.75);
const coinFlip = () => Number(Math.random > 0.5);


/**
 * Is this number between a and b ?
 * @param {number} delta
 * @param {number} a min
 * @param {number} b max
 * @return {Boolean}
 */ 
const between = (delta, a, b) => {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return delta > min && delta < max;
};
