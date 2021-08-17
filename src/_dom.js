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

/**
 * Copies input or text area value to clipboard.
 * Element is here a dom tree element (document.getElementById)
 * @param {Node} element
 */
export const toClipboardFromElement = (element) => {
  try {
    element.select();
    let successful = document.execCommand("copy");
    return !!successful;
  } catch (err) {
    return false;
  }
};

/**
 * Copies area value to the clipboard.
 * @param {String} text
 */
export const toClipboard = (text) => {
  if (typeof window === "undefined") return false;

  let textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";

  textArea.value = text; // set Value

  document.body.appendChild(textArea);
  let success = toClipboardFromElement(textArea);
  document.body.removeChild(textArea);
  return success;
};
