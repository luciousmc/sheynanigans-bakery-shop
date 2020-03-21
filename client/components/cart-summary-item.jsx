import React, { useState } from 'react';

function CartSummaryItem({ cartItem, addToCart, removeFromCart, multiplier }) {
  const [quantity, setQuantity] = useState(multiplier);

  const onQtyChange = async e => {
    const { value } = e.target;

    if (value > quantity) {
      const amt = value - quantity;

      for (let count = 0; count < amt; count++) {
        await addToCart(cartItem);
        setQuantity(quantity + amt);
      }
    }
  };

  return (
    <div className="row cart-item border border-secondary rounded p-3 mb-2 w-75 mx-auto">
      <div className="col-3">
        <img className="cart-img" src={ cartItem.image } alt=""/>
      </div>
      <div className="col-9">
        <div className="row">
          <h5>{ cartItem.name }</h5>
        </div>
        <div className="row">
          <div className="col">
            <p className="lead">{ '$' + (cartItem.price * multiplier / 100).toFixed(2) }</p>
          </div>
          <div className="col">
            <div className="form-group text-right">
              <label htmlFor="qty">Qty:</label>
              <input type="number" id="qty" name="quantity" value={ quantity } onChange={ onQtyChange } />
            </div>
          </div>
        </div>
        <div className="row">
          <p>{ cartItem.shortDescription }</p>
        </div>
        <div className="row">
          <div className="col text-right">
            <div className="d-inline lead text-danger link" onClick={ () => removeFromCart(cartItem.productId) }>
              Remove from cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
