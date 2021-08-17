/**
 * @example
 * fetch('http://example.com')
 *  .then(_Fetch.getResponse)
 */
export const getResponse = (response) => response.json();

/**
 * @example
 * fetch('http://example.com')
 *  .then(_Fetch.getResponse)
 *  .then(_Fetch.processJSON);
 */
export const processJSON = (jsonObject) => console.log(jsonObject);

/**
 * @example
 * const response = await fetch('http://example.com', _Fetch.writeServer("POST", newMovie))
 */
export const writeServer = (action, data = {}) => {
  return {
    method: action,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
