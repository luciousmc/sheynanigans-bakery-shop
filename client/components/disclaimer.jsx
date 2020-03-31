import React from 'react';

function DisclaimerModal(props) {
  return (
    <section className="modal-screen d-flex justify-content-center align-items-center p-0">
      <div className="modal-box p-4">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <h4 className="display-4">Disclaimer</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="lead">
              This site was developed for demonsration purposes only. Do not enter any personal information.
              No charges will be processed. No orders will be placed.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button onClick={ () => props.removeModal() } className="btn btn-outline-dark w-25">Confirm</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisclaimerModal;
