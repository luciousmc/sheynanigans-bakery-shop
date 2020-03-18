import React from 'react';

export default function ItemAddedModal(props) {
  return (
    <section className="modal-screen d-flex justify-content-center align-items-center" id="item-added-modal">
      <div className="container item-added-box p-3">
        <div className="row">
          <div className="col">
            <h3 className="text-center">Item Added! <i className="fas fa-check"></i></h3>
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
            <a href="" className="btn btn-dark d-block m-3">Add Another</a>
            <a href="" className="btn btn-dark d-block m-3">Go to Cart</a>
            <a href="" className="btn btn-dark d-block m-3">Checkout</a>
            <a href="" className="btn btn-dark d-block m-3">Continue Shopping</a>
          </div>
        </div>
      </div>
    </section>
  );
}
