import React, { useState } from 'react';

/** Returns a single Cart Item */
function CartSummaryItem({ cartItem, addToCart, setView, showConfirmDeleteModal, removeSingleItem, params }) {
  const [quantity, setQuantity] = useState(params.multiplier);

  /**
   * Prevents the user from typing in certain characters. Uses event.keyCode to check for button pressed
   * - 189 = NumPad -
   * - 109 = Key -
   * - 107 = NumPad +
   */
  const disableKeyPress = e => {
    if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 107) {
      e.preventDefault();
      return false;
    }
  };

  /**
   * Updates the quantity of the product in the cart based on the number set
   */
  const onQtyChange = e => {
    const { value } = e.target;

    if (value === '') return;
    if (parseInt(value) === 0) {
      showConfirmDeleteModal(cartItem, quantity);
      return;
    }

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
        removeSingleItem(params.ids.pop());
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
      <div className="col-12 col-sm-3 cart-image-container">
        <img
          className="cart-img"
          onClick={ () => setView('details', { productId: cartItem.productId }) }
          src={ cartItem.image }
          alt="Item Image"
        />
      </div>
      <div className="col-12 col-sm-9">
        <div className="row">
          <h5
            onClick={ () => setView('details', { productId: cartItem.productId }) }
            className="cart-title text-center text-sm-left"
          >
            { cartItem.name }
          </h5>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <p className="lead">{ '$' + (cartItem.price * params.multiplier / 100).toFixed(2) }</p>
          </div>
          <div className="col">
            <div className="form-group text-right">
              <label htmlFor="qty">Qty:</label>
              <input type="number" min="0" name="quantity" id="qty" defaultValue={ quantity } onChange={ onQtyChange } onKeyDown={ disableKeyPress } />
            </div>
          </div>
        </div>
        <div className="row d-none d-sm-block">
          <p>{ cartItem.shortDescription }</p>
        </div>
        <div className="row">
          <div className="col text-center text-sm-right">
            <div className="delete-button d-inline lead text-danger link" onClick={ handleDeleteClick }>
              Remove from cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
