import React from 'react';

export default function ItemAddedModal(props) {
  function useNextStep(view) {
    props.hideItemAddedModal();
    props.setView(view, {});
  }

  return (
    <section className="modal-screen d-flex justify-content-center align-items-center" id="item-added-modal">
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
          <div className="col">
            <div className="btn btn-dark d-block m-3">Add Another</div>
            <div className="btn btn-dark d-block m-3" onClick={ () => useNextStep('cart')}>Go to Cart</div>
            <div className="btn btn-dark d-block m-3" onClick={ () => useNextStep('checkout')}>Checkout</div>
            <div className="btn btn-dark d-block m-3" onClick={ () => useNextStep('catalog')}>Continue Shopping</div>
          </div>
        </div>
      </div>
    </section>
  );
}
