/**
 * @param {Node} el the element
 */
export const isWebComponent = (el) =>
  el && el.shadowRoot && el.tagName.includes("-");

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
    root = root.shadowRoot;
  }
  return root.getElementById(elementId);
};

/**
 * Returns the index of a node in a nodeList.
 * @link https://code.area17.com/a17/a17-helpers/wikis/getIndex
 * @param {Node} node
 * @param {NodeList} nodeList
 */
export const getIndex = (node, nodeList) => {
  const nodesLength = nodes.length;
  let nodes = nodeList || node.parentNode.childNodes;
  let n = 0;

  for (let i = 0; i < nodesLength; i++) {
    if (nodes[i] === node) {
      return n;
    }
    if (nodes[i].nodeType === 1) {
      n++;
    }
  }
  return -1;
};

/** Select next child */
export const nextChild = (pathItem, root) => {
  const isShadowRoot = pathItem === "shadowRoot" || pathItem === "shadow-root";
  return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
};

/** Get parent by Id */
export const getParentById = (node, id) => {
  while (node) {
    if (node.id === id) return node;
    node = node.parentNode;
  }
};

/** Get parent by data */
export const getParentByData = (node, key, value) => {
  while (node) {
    if (node.dataset[key] === value) return node;
    node = node.parentNode;
  }
};

/**
 * Get attributes of an element as an object with key/value
 * @param {Node} el
 */
export const getAttributes = (el) => {
  const result = {};
  const atts = el.attributes;
  if (!atts || atts.length === 0) return result;

  for (let i = 0; i < atts.length; i++) {
    const a = atts[i];
    result[a.name] = a.value;
  }
  return result;
};

/** Create an array of DOM elements from given html */
export const createElementsArray = (html = "") => {
  html = html.trim();
  if (!html) return [];

  const temp = document.createElement("template");
  temp.innerHTML = html;
  return Array.from(temp.content.childNodes);
};

/** Create a single DOM element */
export const createElement = (name, attributes = {}, content = "") => {
  const html = tag(name, attributes, content);

  const elements = createElementsArray(html);
  if (elements.length === 0) return null;
  return elements[0];
};

export const attsToString = (attributes) => {
  const array = [];
  forEachEntry(attributes, (k, v) => {
    array.push(`${k}="${v}"`);
  });
  const sep = array.length > 0 ? " " : "";
  return sep + array.join(" ");
};

/** Create the html for a given tag */
export const tag = (name, attributes = {}, content = "") => {
  if (!name) return "";
  const atts = attsToString(attributes);
  return `<${name}${atts}>${content}</${name}>`;
};

/**
 * Set the content of an element
 * @param {DomElement} element The DOM element to change its content
 * @param {String or DomElement} content The new content. Can be a string or another DOM element
 */
export const setContent = (element, ...content) => {
  element.innerHTML = "";
  element.append(...content);
};

/** Remove elements matching given selector */
export const removeElements = (selector, root = document) => {
  const elements = all(selector, root);
  elements.forEach((el) => {
    el.parentNode.removeChild(el);
  });
};

/** Add/remove a given class if condition is true/false */
export const classPresentIf = (el, cssClass, condition) => {
  if (!el) return;
  const func = condition ? "add" : "remove";
  el.classList[func](cssClass);
};

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
 * Takes the passed URL, or the current browser URL and returns an object of query string parameters.
 * [URLSearchParams doesn't work](https://caniuse.com/#search=URLSearchParams)
 * @link https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-toObject
 * @param  {String} url   The URL to get the value from [optional]
 * @return {{}}   An object returned with the url params
 *
 * @example
 *
 * let params = _Dom.queryToObject(url);
 * //=> { param1: 'param1value', param2: 'param2value' }
 */
export const queryToObject = (url) => {
  if (typeof url !== "string") {
    return {};
  }

  let qsObj = {};
  let search =
    url && url.indexOf("?") > -1 ? url.split("?")[1] : location.search;
  search.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      qsObj[$1] = $3;
    }
  );
  return qsObj;
};

/**
 * Get the value of a query string from a URL
 * @link https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-fromObject
 * @param  {{}} obj  The object to get the parameters from
 * @returns {String}  An url returned with the param from the object
 *
 * @example
 *
 * let query = _Dom.queryFromObject({
 *   param1: 'param1value',
 *   param2: 'param2value'
 * });
 * //=> returns: ?param1=param1value&param2=param2value
 */
export const queryFromObject = (obj) => {
  var queryString = "";
  var count = 0;

  if (Object.getOwnPropertyNames(obj).length > 0) {
    queryString = "?";
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      queryString +=
        (count > 0 ? "&" : "") +
        key +
        "=" +
        encodeURIComponent(obj[key]).replace(/[!'()*]/g, function (c) {
          return "%" + c.charCodeAt(0).toString(16);
        });
      count++;
    }
  }
  return queryString;
};

/**
 * Updates a specified key's value in a query string.
 * @link https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-updateParameter
 * @param  {String} url   URL to update
 * @param  {String} key   key to update, if the key doesn't exist, it gets added
 * @param  {String} value value to update, can handle ''
 * @returns {String}  new URL string with updated parameter
 *
 * @example
 *
 * let url = 'https://example.com?foo=bar&baz=qux'
 * newURL = _Dom.queryupdateParameter(initialURL, 'baz', 'foo');
 * //=> returns 'https://example.com?foo=bar&baz=foo'
 */
export const queryupdateParameter = (url, key, value) => {
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
  if (url.match(re)) {
    return url.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    var hash = "";
    if (url.indexOf("#") !== -1) {
      hash = url.replace(/.*#/, "#");
      url = url.replace(/#.*/, "");
    }
    var separator = url.indexOf("?") !== -1 ? "&" : "?";
    return url + separator + key + "=" + value + hash;
  }
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

/**
 * Generates a JS Object out of a form.
 * @link https://code.area17.com/a17/a17-helpers/wikis/objectifyForm
 * @param  {Node} form  A form node
 * @return {String}     The serialized form data
 *
 * @example
 *
 * const form = document.getElementsById('form');
 * const form_data = objectifyForm(form);
 * //=> Object {name: 'Mike', description: 'Interface Engineer', role: 'FE', staff: 'staff'}
 */
export const objectifyForm = (form) => {
  let field;
  let obj = {};

  if (typeof form === "object" && form.nodeName === "FORM") {
    let len = form.elements.length;
    for (let i = 0; i < len; i++) {
      field = form.elements[i];
      if (
        field.name &&
        !field.disabled &&
        field.type !== "file" &&
        field.type !== "reset" &&
        field.type !== "submit" &&
        field.type !== "button"
      ) {
        if (field.type === "select-multiple") {
          for (let j = form.elements[i].options.length - 1; j >= 0; j--) {
            if (field.options[j].selected) {
              obj[field.name] = field.options[j].value;
            }
          }
        } else if (
          (field.type !== "checkbox" && field.type !== "radio") ||
          field.checked
        ) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
};

const isType = (v, type) =>
  Object.prototype.toString.call(v) === `[object ${type}]`;
/** Check if given argument is of String type */
const isString = (s) => isType(s, "String");

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
};

/**
 * Set cursor position in html textbox
 * @link http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
 */
export function setCaretPosition(el, start, end) {
  // get "focus" and make sure we don't have everything -selected-
  el.value = el.value;

  // (el.selectionStart === 0 added for Firefox bug)
  if (el.selectionStart || el.selectionStart === 0) {
    el.focus();
    if (!end || end < start) {
      end = start;
    }
    el.setSelectionRange(start, end);
    return true;
  }

  if (el.createTextRange) {
    const range = el.createTextRange();
    range.move("character", end);
    range.select();
    return true;
  }

  el.focus();
  return false;
}

/**
 * Encode favicon
//FIXME: const document = require("global/document");
const docHead = document.getElementsByTagName("head")[0];
const favicon = (mime, base64data) => {
  const newLink = document.createElement("link");

  newLink.rel = "shortcut icon";
  newLink.href = "data:image/" + mime + ";base64," + base64data;
  docHead.appendChild(newLink);
};

favicon.ico = (base64data) => favicon("x-icon", base64data);
favicon.png = (base64data) => favicon("png", base64data);

export { favicon };
*/
