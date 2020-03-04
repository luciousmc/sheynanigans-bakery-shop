import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className="row cart-item border border-secondary rounded p-3 mb-2">
      <div className="col-3">
        <img className="cart-img" src={ props.cartItem.image } alt=""/>
      </div>
      <div className="col-9">
        <h5>{ props.cartItem.name }</h5>
        <p className="lead">{ '$' + (props.cartItem.price / 100).toFixed(2) }</p>
        <p>{ props.cartItem.shortDescription }</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
