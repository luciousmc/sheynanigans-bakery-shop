/* eslint-disable no-console */
import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      shippingAddress: '',
      addressError: '',
      creditCard: '',
      creditCardError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  validateFields(e) {
    const { value, name } = e.target;

    switch (name) {
      case 'name':
        // Must have an input
        if (!value) {
          this.setState({ nameError: 'Name is required' });

          // Name must be at least 5 characters
        } else if (value.length < 5) {
          this.setState({ nameError: 'Please enter at least 5 characters' });
        }
        break;
      case 'shippingAddress':
      case 'creditCard':
    }
    console.log('this just got blurred witH: ', e.target);
  }

  clearErrors() {
    this.setState({
      nameError: '',
      addressError: '',
      creditCardError: ''
    });
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { total } = this.props;
    const { name, shippingAddress, creditCard } = this.state;
    const { nameError, addressError, creditCardError } = this.state;

    return (
      <section className="container w-50 checkout-container">
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
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={ () => this.props.placeOrder(this.state)}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={ this.handleChange }
                  value={ name }
                  onBlur={ this.validateFields }
                  onFocus={ this.clearErrors }
                  maxLength="65"
                  required
                />
                <div className="name-error">
                  { nameError && nameError }
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  name="shippingAddress"
                  type="textarea"
                  className="form-control"
                  id="address"
                  onChange={ this.handleChange }
                  onBlur={ this.validateFields }
                  onFocus={ this.clearErrors }
                  value={ shippingAddress }
                  required
                />
                <div className="address-error">
                  { addressError && addressError }
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="credit-card">Credit Card Number:</label>
                <input
                  name="creditCard"
                  type="text"
                  className="form-control"
                  id="credit-card"
                  onChange={ this.handleChange }
                  onBlur={ this.validateFields }
                  onFocus={ this.clearErrors }
                  value={ creditCard }
                  required
                />
                <div className="credit-card-error">
                  { creditCardError && creditCardError }
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Purchase</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-3">
            <a href="" onClick={ () => this.props.setView('catalog', {}) }>
              &lt; Continue Shopping
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default CheckoutForm;
