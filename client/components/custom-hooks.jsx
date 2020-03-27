/**
 * Filters out duplicate cart items
 * @returns {Object[]} Returns an array of objects containing product data
 */
export const useFilterDuplicates = cartArray => {
  const output = [];

  cartArray.map(cartItem => {
    return output.filter(outputItem => {
      return outputItem.productId === cartItem.productId;
    }).length > 0
      ? null
      : output.push(cartItem);
  });
  return [output];
};

/**
 * Counts the amount of duplicate items there are in the cart and extracts their cart ids.
 * @params {Object[]} cartArray - Array of cart items to be counted
 * @returns {{multiplier: number, ids: number[]}} Returns an object with item count and and array of their ids
 */
export const useGetItemCount = cartArray => {
  const listLen = cartArray.length;
  const params = {};

  for (let i = 0; i < listLen; i++) {
    const product = cartArray[i];
    const { productId, cartItemId } = product;

    if (params[productId]) {
      params[productId].multiplier += 1;
      params[productId].ids.push(cartItemId);
    } else {
      params[productId] = {
        multiplier: 1,
        ids: [cartItemId]
      };
    }
  }
  return [params];
};
