import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  let body;
  let total = 0;

  if (props.list === []) {
    body = <h3>There are no items in the cart</h3>;
  } else {
    body = (
      props.list.map(item => {
        total += item.price;
        return <CartSummaryItem cartItem={ item } key={ item.cartItemId } />;
      })
    );
  }
  return (
    <section className="container w-50">
      <div className="row">
        <div className="col-12">
          <div onClick={ () => props.setView('catalog', {}) } className="btn btn-back-to-catalog">
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
      <div className="row">
        <div className="col">
          <div className="h3 m-3">{ 'Total Cost: $' + (total / 100).toFixed(2) }</div>
        </div>
      </div>
    </section>
  );
}

export default CartSummary;
