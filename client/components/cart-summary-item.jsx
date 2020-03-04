import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className="row border border-secondary rounded">
      <div className="col-4">
        <img className="cart-img" src={ props.image } alt=""/>
      </div>
      <div className="col-8">
        <h5>{ props.name }</h5>
        <p className="lead">{ props.price }</p>
        <p>{ props.shortDescription }</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
