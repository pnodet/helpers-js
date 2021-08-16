/**
 * @example
 * fetch('http://example.com')
 *  .then(getResponse)
 */
export const getResponse = (response) => response.json();

/**
 * @example
 * fetch('http://example.com')
 *  .then(getResponse)
 *  .then(processJSON);
 */
export const processJSON = (jsonObject) => console.log(jsonObject);

/**
 * @example
 * const response = await fetch('http://example.com', writeServer("POST", newMovie))
 */
export const writeServer = (action, data = {}) => {
  return {
    method: action,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
