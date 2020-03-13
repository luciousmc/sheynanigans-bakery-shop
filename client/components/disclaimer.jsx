import React from 'react';

class DisclaimerModal extends React.Component {
  constructor(props) {
    super(props);
    this.removeModal = this.removeModal.bind(this);
  }

  removeModal(event) {
    // eslint-disable-next-line no-console
    console.log('the event is: ', event);
  }

  render() {
    return (
      <section className="modal-screen d-flex justify-content-center align-items-center p-0">
        <div className="modal-box p-4">
          <div className="row">
            <div className="col d-flex justify-content-between">
              <p className="display-4">Disclaimer</p>
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
              <button onClick={ () => this.props.setVisit() } className="btn btn-outline-dark w-25">Confirm</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DisclaimerModal;
