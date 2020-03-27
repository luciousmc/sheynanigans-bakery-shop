import React, { useState } from 'react';

/** Returns a single Cart Item */
function CartSummaryItem({ cartItem, addToCart, setView, showConfirmDeleteModal, removeSingleItem, params }) {
  const [quantity, setQuantity] = useState(params.multiplier);

  /**
   * Updates the quantity of the product in the cart based on the number set
   */
  const onQtyChange = e => {
    const { value } = e.target;

    if (value > quantity) {
      const amt = value - quantity;
      for (let count = 0; count < amt; count++) {
        addToCart(cartItem);
        setQuantity(quantity + amt);
      }
    }

    if (quantity > value) {
      const amt = quantity - value;
      for (let count = 0; count < amt; count++) {
        removeSingleItem(cartItem.cartItemId);
        setQuantity(quantity - amt);
      }
    }
  };

  const handleDeleteClick = e => {
    e.preventDefault();
    showConfirmDeleteModal(cartItem, quantity);
  };

  return (
    <div className="row cart-item border border-secondary rounded p-3 mb-2 w-75 mx-auto">
      <div className="col-3">
        <img className="cart-img"
          onClick={ () => setView('details', { productId: cartItem.productId }) }
          src={ cartItem.image }
          alt="Item Image"
        />
      </div>
      <div className="col-9">
        <div className="row">
          <h5
            onClick={ () => setView('details', { productId: cartItem.productId }) }
            className="cart-title"
          >
            { cartItem.name }
          </h5>
        </div>
        <div className="row">
          <div className="col">
            <p className="lead">{ '$' + (cartItem.price * params.multiplier / 100).toFixed(2) }</p>
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
            <div className="d-inline lead text-danger link" onClick={ handleDeleteClick }>
              Remove from cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
