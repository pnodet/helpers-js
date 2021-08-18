/* eslint-disable */
/**
 * Get the URL parameters
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export const getParams = (url = window.location) => {
  const params = {};
  new URL(url).searchParams.forEach((val, key) => {
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
  const params = new URL(url).searchParams;
  const val = params.getAll(param);
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
 * let params = _Url.queryToObject(url);
 * //=> { param1: 'param1value', param2: 'param2value' }
 */
export const queryToObject = url => {
  if (typeof url !== 'string') {
    return {};
  }

  const qsObj = {};
  const search =
    url && url.indexOf('?') > -1 ? url.split('?')[1] : location.search;
  search.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    qsObj[$1] = $3;
  });
  return qsObj;
};

/**
 * Get the value of a query string from an object
 * @link https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-fromObject
 * @param  {{}} obj  The object to get the parameters from
 * @returns {String}  An url returned with the param from the object
 *
 * @example
 *
 * let query = _Url.queryFromObject({
 *   param1: 'param1value',
 *   param2: 'param2value'
 * });
 * //=> returns: ?param1=param1value&param2=param2value
 */
export const queryFromObject = obj => {
  let queryString = '';
  let count = 0;

  if (Object.getOwnPropertyNames(obj).length > 0) {
    queryString = '?';
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      queryString += `${(count > 0 ? '&' : '') + key}=${encodeURIComponent(
        obj[key]
      ).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`)}`;
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
 * newURL = _Url.queryupdateParameter(initialURL, 'baz', 'foo');
 * //=> returns 'https://example.com?foo=bar&baz=foo'
 */
export const queryupdateParameter = (url, key, value) => {
  const re = new RegExp(`([?&])${key}=.*?(&|#|$)`, 'i');
  if (url.match(re)) {
    return url.replace(re, `$1${key}=${value}$2`);
  }
  let hash = '';
  if (url.indexOf('#') !== -1) {
    hash = url.replace(/.*#/, '#');
    url = url.replace(/#.*/, '');
  }
  const separator = url.indexOf('?') !== -1 ? '&' : '?';
  return `${url + separator + key}=${value}${hash}`;
};
