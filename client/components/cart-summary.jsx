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
        <div className="col">
          <div onClick={ () => setView('catalog', {}) } className="lead text-primary text-center text-sm-left link">
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
          { listLen > 0 && <div className="cart-total h3 m-3">{ 'Total Cost: $' + (total / 100).toFixed(2) }</div> }
        </div>
      </div>
      <div className="col text-center text-sm-right p-3">
        <button className="checkout-button btn btn-dark" onClick={ () => setView('checkout', {})}>Checkout</button>
      </div>
    </section>
  );
}

export default CartSummary;
