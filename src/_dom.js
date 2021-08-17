/**
 * @param {Node} el the element
 */
export const isWebComponent = el => el && el.shadowRoot && el.tagName.includes('-');

/** Select all elements matching given selector */
export const allElements = (selector, root = document) => {
  if (isWebComponent(root)) {
    root = root.shadowRoot;
  }
  return Array.from(root.querySelectorAll(selector));
};

/** Select element with a given id */
export const id = (elementId, root = document) => {
  if (isWebComponent(root)) {
    root = root.shadowRoot
  }
  return root.getElementById(elementId)
}

/** Select next child */
export const nextChild = (pathItem, root) => {
  const isShadowRoot = pathItem === "shadowRoot" || pathItem === "shadow-root";
  return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
}

/**
 * Get attributes of an element as an object with key/value
 * @param {Node} el
 */
export const getAttributes = el => {
  const result = {}
  const atts = el.attributes
  if (!atts || atts.length === 0) return result

  for (let i = 0; i < atts.length; i++) {
    const a = atts[i]
    result[a.name] = a.value
  }
  return result
}

/** Create an array of DOM elements from given html */
export const createElementsArray = (html = '') => {
  html = html.trim()
  if (!html) return []

  const temp = document.createElement('template')
  temp.innerHTML = html
  return Array.from(temp.content.childNodes)
}

/** Create a single DOM element */
export const createElement = (name, attributes = {}, content = '') => {
  const html = tag(name, attributes, content)

  const elements = createElementsArray(html)
  if (elements.length === 0) return null
  return elements[0]
}

export const attsToString = (attributes) => {
  const array = []
  forEachEntry(attributes, (k, v) => {
    array.push(`${k}="${v}"`)
  })
  const sep = array.length > 0 ? ' ' : ''
  return sep + array.join(' ')
}

/** Create the html for a given tag */
export const tag = (name, attributes = {}, content = '') => {
  if (!name) return ''
  const atts = attsToString(attributes)
  return `<${name}${atts}>${content}</${name}>`
}

/**
 * Set the content of an element
 * @param {DomElement} element The DOM element to change its content
 * @param {String or DomElement} content The new content. Can be a string or another DOM element
 */
export const setContent = (element, ...content) => {
  element.innerHTML = ''
  element.append(...content)
}

/** Remove elements matching given selector */
export const removeElements = (selector, root = document) => {
  const elements = all(selector, root)
  elements.forEach(el => {
    el.parentNode.removeChild(el)
  })
}

/** Add/remove a given class if condition is true/false */
export const classPresentIf = (el, cssClass, condition) => {
  if (!el) return
  const func = condition ? 'add' : 'remove'
  el.classList[func](cssClass)
}

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
export const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split(`; ${name}=`);
  if (parts.length == 2) return parts.pop().split(";").shift();
};

/**
 * Get the URL parameters
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export const getParams = (url = window.location) => {
  let params = {};
  new URL(url).searchParams.forEach(function (val, key) {
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(val);
    } else {
      params[key] = val;
    }
  });
  return params;
};

/**
 * Get the value of a query string from a URL
 * @param  {String} param The parameter to get the value of
 * @param  {String} url   The URL to get the value from [optional]
 * @return {String}       The value
 */
export const getQueryString = (param, url = window.location) => {
  let params = new URL(url).searchParams;
  let val = params.getAll(param);
  if (val.length > 1) return val;
  return val[0];
};

/**
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
export const serialize = (data) => {
  let obj = {};
  for (let [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
};

const isType = (v, type) => Object.prototype.toString.call(v) === `[object ${type}]`;
/** Check if given argument is of String type */
const isString = (s) => isType(s, 'String')

const LOCATIONS = new Set([
  "beforebegin",
  "afterbegin",
  "beforeend",
  "afterend",
]);

/**
 * Add html or elements to given target element
 * @param target The element to add to
 * @param tobeAdded Can be html string, a DOM element, or an array of DOM elements
 * @param location String. Where to add in the target. Ons of:
 * beforebegin, afterbegin, beforeend, afterend. The default if ommited is beforeend
 *@returns {boolean} true if added, false if not
 */
export const add = (target, tobeAdded, location = "beforeend") => {
  location = location.toLowerCase();
  if (!LOCATIONS.has(location)) return false;

  if (isString(tobeAdded)) {
    target.insertAdjacentHTML(location, tobeAdded);
  } else {
    addElements(target, tobeAdded, location);
  }
  return true;
}