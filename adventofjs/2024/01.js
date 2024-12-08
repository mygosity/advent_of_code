/**
 * @param {number[]} gifts - The array of gifts to prepare
 * @returns {number[]} An array with the prepared gifts
 */
function prepareGifts(gifts) {
  // Code here
  return Array.from(new Set(gifts)).sort((x, y) => x - y);
}
