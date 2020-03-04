import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shippingAddress: '',
      creditCard: ''
    };
    this.handleNameValChange = this.handleNameValChange.bind(this);
    this.handleAddressValChange = this.handleAddressValChange.bind(this);
    this.handleCreditCardValChange = this.handleCreditCardValChange.bind(this);
  }

  handleNameValChange(e) {
    this.setState({ name: e.target.value });
  }

  handleAddressValChange(e) {
    this.setState({ shippingAddress: e.target.value });
  }

  handleCreditCardValChange(e) {
    this.setState({ creditCard: e.target.value });
  }

  render() {
    const total = this.props.total;
    return (
      <section className="container w-50">
        <div className="row">
          <div className="col-6">
            <h1>Checkout</h1>
          </div>
          <div className="col-6">
            <p className="lead mb-0 text-right p-3">{ 'Total Cost: $' + (total / 100).toFixed(2) }</p>
          </div>
          <hr/>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={ () => this.props.placeOrder(this.state)}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" onChange={ this.handleNameValChange } />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" className="form-control" id="address" onChange={ this.handleAddressValChange } />
              </div>
              <div className="form-group">
                <label htmlFor="credit-card">Credit Card Number:</label>
                <input type="text" className="form-control" id="credit-card" onChange={ this.handleCreditCardValChange } />
              </div>
              <button type="submit" className="btn btn-primary">Purchase</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-3">
            <div onClick={ () => this.props.setView('catalog', {}) } className="btn btn-back-to-catalog">
              &lt; Continue Shopping
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CheckoutForm;
