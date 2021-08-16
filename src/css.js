/**
 * Checks whether an element has a particular class
 * @param {Node} el
 * @param {String} className
 * @return {Boolean}
 */
const hasClass = (el, className) => el.classList.contains(className);

/**
 * Toggle a class for an element
 * @param {Node} el
 * @param {String} className
 */
const toggleClass = (el, className) => el.classList.toggle(className);

/**
 * Get the value of a CSS rule for a particular element
 * @param {Node} el
 * @param {String} ruleName
 */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

/**
 * Add a class to all elements of a NodeList
 * @param {NodeList} NodeList
 * @param {String} className
 */
const addClass = (NodeList, className) => {
  NodeList.forEach(el => {
    el.classList.add(className);
  });
}

/**
 * Remove a class to all elements of a NodeList
 * @param {NodeList} NodeList
 * @param {String} className
 */
const removeClass = (NodeList, className) => {
  NodeList.forEach((el) => {
    el.classList.remove(className);
  });
};

export { hasClass, toggleClass, getStyle, addClass, removeClass };
