import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary({ cartItems, total, addToCart, removeFromCart, showConfirmDeleteModal, removeSingleItem, setView }) {
  const listLen = cartItems.length;

  /**
   * Counts the amount of duplicate items there are in the cart and extracts their cart ids
   * @returns {{multiplier: number, ids: number[]}} Returns an object with item count and and array of their ids
   */
  const getItemCountParams = () => {
    const params = {};

    for (let i = 0; i < listLen; i++) {
      const product = cartItems[i];
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
    return params;
  };

  const params = getItemCountParams();

  /**
   * Filters out duplicate cart items
   * @returns {Object[]} Returns an array of objects containing product data
   */
  const filterDuplicates = () => {
    const output = [];

    cartItems.map(cartItem => {
      return output.filter(outputItem => {
        return outputItem.productId === cartItem.productId;
      }).length > 0
        ? null
        : output.push(cartItem);
    });

    return output;
  };

  const renderItems = filterDuplicates();

  return (
    <section className="container w-80 rounded cart-summary-container">
      <div className="row">
        <div className="col-12">
          <div onClick={ () => setView('catalog', {}) } className="d-inline lead text-primary link">
            &lt; Back to Catalog
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1>My Cart</h1>
          <hr/>
        </div>
      </div>
      {
        listLen === 0
          ? <h3>There are no items in the cart</h3>
          : renderItems.map(item => {
            return (
              <CartSummaryItem
                params={ params[item.productId] }
                cartItem={ item }
                key={ item.cartItemId }
                addToCart={ addToCart }
                showConfirmDeleteModal={ showConfirmDeleteModal }
                removeSingleItem={ removeSingleItem }
              />
            );
          })
      }
      <div className="row">
        <div className="col">
          { listLen > 0 && <div className="h3 m-3">{ 'Total Cost: $' + (total / 100).toFixed(2) }</div> }
        </div>
      </div>
      <div className="col text-right p-3">
        <button className="btn btn-dark" onClick={ () => setView('checkout', {})}>Checkout</button>
      </div>
    </section>
  );
}

export default CartSummary;
