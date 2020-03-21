import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  let body, totalTxt;
  let total = 0;

  if (props.list.length === 0) {
    body = <h3>There are no items in the cart</h3>;
  } else {
    body = (
      props.list.map(item => {
        total += item.price;
        return <CartSummaryItem cartItem={ item } key={ item.cartItemId } removeFromCart={ props.removeFromCart }/>;
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
          <div onClick={ () => props.setView('catalog', {}) } className="d-inline lead text-primary link">
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
        <button className="btn btn-dark" onClick={ () => props.setView('checkout', { total })}>Checkout</button>
      </div>
    </section>
  );
}

export default CartSummary;
