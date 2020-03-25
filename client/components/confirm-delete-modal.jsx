import React from 'react';

function ConfirmDeleteModal({ hideConfirmDeleteModal, removeFromCart, product: { name, productId }, productAmt }) {

  const handleDeleteItemClick = () => {
    removeFromCart(productId);
    hideConfirmDeleteModal();
  };

  return (
    <section className="modal-screen d-flex justify-content-center align-items-center" id="confirm-delete-modal">
      <div className="container confirm-delete-box p-3">
        <div className="row">
          <div className="col">
            <h3 className="text-center text-warning">Are you sure?</h3>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h5 className="lead">{ `Do you want to remove ${productAmt} "${name}" from the cart?` }</h5>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col text-right">
            <button onClick={ handleDeleteItemClick } className="btn btn-danger mr-3">Delete Item</button>
            <button onClick={ () => hideConfirmDeleteModal() } className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmDeleteModal;
