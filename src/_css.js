/**
 * Checks whether an element has a particular class
 * @param {HTMLElement} el
 * @param {String} className
 * @return {Boolean}
 */
export const hasClass = (el, className) => el.classList.contains(className);

/**
 * Toggle a class for an element
 * @param {HTMLElement} el
 * @param {String} className
 */
export const toggleClass = (el, className) => el.classList.toggle(className);

/**
 * Get the value of a CSS rule for a particular element
 * @param {HTMLElement} el
 * @param {String} ruleName
 */
export const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

/**
 * Add a class for an element
 * @param {HTMLElement} el
 * @param {String} className
 */
export const addClass = (el, className) => el.classList.add(className);

/**
 * Add a class to all elements of a NodeList
 * @param {NodeList} NodeList
 * @param {String} className
 */
export const addClassAll = (NodeList, className) => {
  NodeList.forEach((el) => {
    el.classList.add(className);
  });
};

/**
 * Remove a class for an element
 * @param {HTMLElement} el
 * @param {String} className
 */
export const removeClass = (el, className) => el.classList.remove(className);

/**
 * Remove a class to all elements of a NodeList
 * @param {NodeList} NodeList
 * @param {String} className
 */
export const removeClassAll = (NodeList, className) => {
  NodeList.forEach((el) => {
    el.classList.remove(className);
  });
};

/**
 * Returns the current media query in use by looking at the font-family of the head of the document
 * and text in pseudo content on the body. Useful for running JS functions at certain breakpoints
 * without holding breakpoint size information in CSS and JS.
 * @link https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery
 */
export const getCurrentMediaQuery = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--breakpoint")
    .trim();

/**
 * Returns a metatag content by name
 * @link https://code.area17.com/a17/a17-helpers/wikis/getMetaContentByName
 */
export const getMetaContentByName = (name) =>
  document.querySelector("meta[name='" + name + "']").getAttribute("content");

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOM(el, name, handler, ...args) {
  if (el.addEventListener) {
    el.addEventListener(name, handler, ...args);
  } else if (el.attachEvent) {
    el.attachEvent(`on${name}`, handler, ...args);
  }
}

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function offDOM(el, name, handler, ...args) {
  if (el.removeEventListener) {
    el.removeEventListener(name, handler, ...args);
  } else if (el.detachEvent) {
    el.detachEvent(`on${name}`, handler, ...args);
  }
}

/**
 * @param {...HTMLElement | Window | Document} els
 * @param {...String} names
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOMMany(els, names, handler, ...args) {
  for (const el of els) {
    for (const name of names) {
      onDOM(el, name, handler, ...args);
    }
  }
  const destroy = () => {
    for (const el of els) {
      for (const name of names) {
        offDOM(el, name, handler);
      }
    }
  };
  return destroy;
}

/**
 * @param {String} url
 */
export function getImageSizeByUrl(url) {
  const image = document.createElement("img");
  return new Promise(function (resolve, reject) {
    onDOM(image, "load", () => {
      resolve({ width: image.width, height: image.height });
    });
    onDOM(image, "error", (e) => {
      reject(e);
    });
    image.src = url;
  });
}
