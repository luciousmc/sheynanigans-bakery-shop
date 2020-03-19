import React, { useState } from 'react';

function CartSummaryItem(props) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="row cart-item border border-secondary rounded p-3 mb-2 w-75 mx-auto">
      <div className="col-3">
        <img className="cart-img" src={ props.cartItem.image } alt=""/>
      </div>
      <div className="col-9">
        <div className="row">
          <h5>{ props.cartItem.name }</h5>
        </div>
        <div className="row">
          <div className="col">
            <p className="lead">{ '$' + (props.cartItem.price / 100).toFixed(2) }</p>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="qty">Qty:</label>
              <input type="number" id="qty" name="quantity" value={ quantity } onChange={ e => setQuantity(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <p>{ props.cartItem.shortDescription }</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
