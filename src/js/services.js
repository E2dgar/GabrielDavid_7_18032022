const replace = (pattern, string) => string.replace(pattern, "");

/**
 *
 * @param {Array} array
 * @param {string} item
 */
const pushInArray = (array, item) => {
  if (!array.includes(item)) {
    array.push(item);
  }
};

export { replace, pushInArray };
