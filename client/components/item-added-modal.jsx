import React from 'react';

export default function ItemAddedModal({ hideItemAddedModal, setView }) {
  function handleButtonClick(view) {
    hideItemAddedModal();
    setView(view, {});
  }

  return (
    <section
      onClick={ () => hideItemAddedModal()} className="modal-screen d-flex justify-content-center align-items-center" id="item-added-modal">
      <div className="container item-added-box p-3">
        <div className="row">
          <div className="col">
            <h3 className="text-center text-success">Item Added! <i className="fas fa-check"></i></h3>
            <hr/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5 className="text-center lead">What would you like to do?</h5>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-dark btn-block my-3" onClick={ () => handleButtonClick('cart')}>Go to Cart</button>
            <button className="btn btn-dark btn-block my-3" onClick={ () => handleButtonClick('checkout')}>Checkout</button>
            <button className="btn btn-dark btn-block my-3" onClick={ () => handleButtonClick('catalog')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </section>
  );
}
