import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { useFilterDuplicates, useGetItemCount } from './custom-hooks';

function CartSummary({ cartItems, total, addToCart, showConfirmDeleteModal, removeSingleItem, setView }) {
  const [params] = useGetItemCount(cartItems);
  const [renderItems] = useFilterDuplicates(cartItems);
  const listLen = cartItems.length;

  return (
    <section className="container w-80 rounded cart-summary-container">
      <div className="row">
        <div className="col text-center text-sm-left">
          <div onClick={ () => setView('catalog', {}) } className="d-inline lead font-weight-bold text-primary link">
            &lt; Back to Catalog
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="text-center text-sm-left">My Cart</h1>
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
                setView={ setView }
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
          {
            listLen > 0 &&
              <h3 className="cart-total m-3 text-center text-sm-left">
                { 'Total Cost: $' + (total / 100).toFixed(2) }
              </h3>
          }
        </div>
      </div>
      <div className="col text-center text-sm-right p-3">
        <button className="checkout-button btn btn-dark" onClick={ () => setView('checkout', {})}>Checkout</button>
      </div>
    </section>
  );
}

export default CartSummary;
