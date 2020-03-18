import React from 'react';

export default function ItemAddedModal(props) {
  return (
    <section className="modal-screen">
      <div className="container item-added-box">
        <div className="row">
          <div className="col">
            <h3>Item Added! <i className="fas fa-check"></i></h3>
            <hr/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>What would you like to do?</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a href="" className="btn btn-dark">Add Again</a>
            <a href="" className="btn btn-dark">Go to Cart</a>
            <a href="" className="btn btn-dark">Continue Shopping</a>
          </div>
        </div>
      </div>
    </section>
  );
}
