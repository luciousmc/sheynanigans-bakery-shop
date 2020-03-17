/* eslint-disable no-console */
import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      addressLine: '',
      addressError: '',
      city: '',
      cityError: '',
      state: '',
      stateError: '',
      zipcode: '',
      zipcodeError: '',
      creditCard: '',
      creditCardError: '',
      cvv: '',
      cvvError: '',
      isValid: false
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
      case 'addressLine':
        if (!value) {
          this.setState({ addressError: 'Address is required' });
        } else if (value.length < 6) {
          this.setState({ addressError: 'Please enter at least 6 characters for address' });
        }
        break;
      case 'city':
        if (!value) {
          this.setState({ cityError: 'City is required' });
        } else if (value.length < 3) {
          this.setState({ cityError: 'Please enter at least 3 characters for city' });
        }
        break;
      case 'state':
        if (!value) {
          this.setState({ stateError: 'State is required' });
        } else if (!isNaN(value)) {
          this.setState({ stateError: 'Please use 2 letter state code' });
        }
        break;
      case 'zipcode':
        if (!value) {
          this.setState({ zipcodeError: 'Zip is required' });
        } else if (isNaN(value)) {
          this.setState({ zipcodeError: 'Please use 2 letter state code' });
        }
        break;
      case 'creditCard':
        if (!value) {
          this.setState({ creditCardError: 'Credit Card is required' });
        } else if (value.length < 15) {
          this.setState({ creditCardError: 'Invalid Credit Card Number' });
        }
        break;
      case 'cvv':
        if (!value) {
          this.setState({ cvvError: 'CVV is required' });
        }
    }
  }

  clearErrors(field) {
    switch (field) {
      case 'name':
        this.setState({ nameError: '' });
        break;
      case 'addressLine':
        this.setState({ addressError: '' });
        break;
      case 'city':
        this.setState({ cityError: '' });
        break;
      case 'state':
        this.setState({ stateError: '' });
        break;
      case 'zipcode':
        this.setState({ zipcodeError: '' });
        break;
      case 'creditCard':
        this.setState({ creditCardError: '' });
        break;
    }
  }

  handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'state') {
      const noNumbers = /[0-9]/g;
      value = value.replace(noNumbers, '');
    }
    if (name === 'creditCard' || name === 'zipcode' || name === 'cvv') {
      const noLetters = /[A-Za-z]/gi;
      value = value.replace(noLetters, '');
    }
    if (name === 'state') {
      value = value.toUpperCase();
    }
    this.setState({ [name]: value });
  }

  render() {
    const { total } = this.props;
    const { name, addressLine, city, state, zipcode, creditCard, cvv } = this.state;
    const { nameError, addressError, cityError, stateError, zipcodeError, creditCardError, cvvError } = this.state;

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
          <div className="col d-flex justify-content-center">
            <form className="w-75" onSubmit={ () => this.props.placeOrder(this.state)}>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={ this.handleChange }
                    onBlur={ this.validateFields }
                    onFocus={ () => this.clearErrors('name') }
                    value={ name }
                    maxLength="65"
                    required
                  />
                  <div className="name-error">
                    { nameError && nameError }
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <label htmlFor="address">Address:</label>
                  <input
                    name="addressLine"
                    type="text"
                    className="form-control"
                    id="address"
                    onChange={ this.handleChange }
                    onBlur={ this.validateFields }
                    onFocus={ () => this.clearErrors('addressLine') }
                    value={ addressLine }
                    maxLength="42"
                    required
                  />
                  <div className="address-error">
                    { addressError && addressError }
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-6">
                  <div className="city">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      onChange={ this.handleChange }
                      onBlur={ this.validateFields }
                      onFocus={ () => this.clearErrors('city') }
                      value={ city }
                      maxLength="50"
                      required
                    />
                    <div className="city-error">
                      { cityError && cityError }
                    </div>
                  </div>
                </div>

                <div className="form-group col-2">
                  <div className="state">
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      onChange={ this.handleChange }
                      onBlur={ this.validateFields }
                      onFocus={ () => this.clearErrors('state') }
                      value={ state }
                      maxLength="2"
                      required
                    />
                    <div className="state-error">
                      { stateError && stateError }
                    </div>
                  </div>
                </div>

                <div className="form-group col-4">
                  <div className="zipcode">
                    <label htmlFor="zipcode">Zip:</label>
                    <input
                      type="text"
                      name="zipcode"
                      className="form-control"
                      onChange={ this.handleChange }
                      onBlur={ this.validateFields }
                      onFocus={ () => this.clearErrors('zipcode') }
                      value={ zipcode }
                      maxLength="5"
                      required
                    />
                    <div className="zipcode-error">
                      { zipcodeError && zipcodeError }
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="creditCard">Credit Card Number:</label>
                    <input
                      name="creditCard"
                      type="text"
                      className="form-control"
                      id="credit-card"
                      onChange={ this.handleChange }
                      onBlur={ this.validateFields }
                      onFocus={ () => this.clearErrors('creditCard') }
                      value={ creditCard }
                      maxLength="16"
                      required
                    />
                    <div className="credit-card-error">
                      { creditCardError && creditCardError }
                    </div>
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                      name="cvv"
                      type="text"
                      className="form-control"
                      id="cvv"
                      onChange={ this.handleChange }
                      onBlur={ this.validateFields }
                      onFocus={ () => this.clearErrors('cvv') }
                      value={ cvv }
                      maxLength="4"
                      required
                    />
                    <div className="credit-card-error">
                      { cvvError && cvvError }
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary">Purchase</button>
                </div>
              </div>
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
