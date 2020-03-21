import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary({ list, addToCart, removeFromCart, setView }) {
  const listLen = list.length;
  let body, totalTxt;
  let total = 0;

  if (listLen === 0) {
    body = <h3>There are no items in the cart</h3>;
  } else {
    const productMultiplier = {};

    for (let i = 0; i < listLen; i++) {
      if (productMultiplier[list[i].productId]) {
        productMultiplier[list[i].productId] = productMultiplier[list[i].productId] + 1;
      } else {
        productMultiplier[list[i].productId] = 1;
      }
    }

    body = (
      list.map((item, index, list) => {
        total += item.price;
        return (
          <CartSummaryItem
            multiplier={ productMultiplier[item.productId] }
            cartItem={ item }
            key={ item.cartItemId }
            addToCart={ addToCart }
            removeFromCart={ removeFromCart }
          />);
      })
    );
    totalTxt = (
      <div className="row">
        <div className="col">
          <div className="h3 m-3">{ 'Total Cost: $' + (total / 100).toFixed(2) }</div>
        </div>
      </div>
    );
  }

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
      { body }
      { totalTxt }
      <div className="col text-right p-3">
        <button className="btn btn-dark" onClick={ () => setView('checkout', { total })}>Checkout</button>
      </div>
    </section>
  );
}

export default CartSummary;
