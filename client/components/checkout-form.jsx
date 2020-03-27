/* eslint-disable no-console */
import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: 'Name required',
      addressLine: '',
      addressError: 'Address required',
      city: '',
      cityError: 'City required',
      state: '',
      stateError: 'State required',
      zipcode: '',
      zipcodeError: 'Zip required',
      creditCard: '',
      creditCardError: 'Credit Card required',
      cvv: '',
      cvvError: 'CVV required',
      isValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoSubmit = this.handleNoSubmit.bind(this);
  }

  validateFields(e) {
    // Create local variables from the target object
    const { value, name } = e.target;
    // Create local variables from the state for err messages
    const { nameError, addressError, cityError, stateError, zipcodeError, creditCardError, cvvError } = this.state;

    if (!nameError && !addressError && !cityError && !stateError && !zipcodeError && !creditCardError && !cvvError) {
      this.setState({ isValid: true });
    }

    switch (name) {
      case 'name':
        // Make the error element visible
        document.getElementById('name-error').style.visibility = 'visible';

        // Name is required
        if (!value) {
          this.setState({ nameError: 'Name is required' });

        // Name must be at least 5 characters
        } else if (value.length < 5) {
          this.setState({ nameError: 'Please enter at least 5 characters' });

          // If all conditions pass, remove any err messages if there are any
        } else {
          this.setState({ nameError: '' });
        }
        break;
      case 'addressLine':
        // Make the error element visible
        document.getElementById('address-error').style.visibility = 'visible';

        // Field is required
        if (!value) {
          this.setState({ addressError: 'Address is required' });

          // Input must be at least 6 characters long to be valid
        } else if (value.length < 6) {
          this.setState({ addressError: 'Please enter at least 6 characters for address' });

          // If all conditions pass, remove any err messages if there are any
        } else {
          this.setState({ addressError: '' });
        }
        break;
      case 'city':
        document.getElementById('city-error').style.visibility = 'visible';

        if (!value) {
          this.setState({ cityError: 'City is required' });
        } else if (value.length < 3) {
          this.setState({ cityError: 'Please enter at least 3 characters for city' });
        } else {
          this.setState({ cityError: '' });
        }
        break;
      case 'state':
        document.getElementById('state-error').style.visibility = 'visible';

        if (!value) {
          this.setState({ stateError: 'State is required' });
        } else if (!isNaN(value)) {
          this.setState({ stateError: 'Please use 2 letter state code' });
        } else {
          this.setState({ stateError: '' });
        }
        break;
      case 'zipcode':
        document.getElementById('zipcode-error').style.visibility = 'visible';

        if (!value) {
          this.setState({ zipcodeError: 'Zip is required' });
        } else if (isNaN(value)) {
          this.setState({ zipcodeError: 'Please use 2 letter state code' });
        } else {
          this.setState({ zipcodeError: '' });
        }
        break;
      case 'creditCard':
        document.getElementById('credit-card-error').style.visibility = 'visible';

        if (!value) {
          this.setState({ creditCardError: 'Credit Card is required' });
        } else if (value.length < 15) {
          this.setState({ creditCardError: 'Invalid Credit Card Number' });
        } else {
          this.setState({ creditCardError: '' });
        }
        break;
      case 'cvv':
        document.getElementById('cvv-error').style.visibility = 'visible';

        if (!value) {
          this.setState({ cvvError: 'CVV is required' });
        } else if (value.length < 3) {
          this.setState({ cvvError: 'Invalid CVV' });
        } else {
          this.setState({ cvvError: '' });
        }
    }
  }

  showErrors(e) {
    const { name } = e.target;
    const { nameError, addressError, cityError, stateError, zipcodeError, creditCardError, cvvError } = this.state;

    if (name === 'name' && nameError) {
      document.getElementById('name-error').style.visibility = 'visible';
    }

    if (name === 'addressLine' && addressError) {
      document.getElementById('address-error').style.visibility = 'visible';
    }

    if (name === 'city' && cityError) {
      document.getElementById('city-error').style.visibility = 'visible';
    }

    if (name === 'state' && stateError) {
      document.getElementById('state-error').style.visibility = 'visible';
    }

    if (name === 'zipcode' && zipcodeError) {
      document.getElementById('zipcode-error').style.visibility = 'visible';
    }

    if (name === 'creditCard' && creditCardError) {
      document.getElementById('credit-card-error').style.visibility = 'visible';
    }

    if (name === 'cvv' && cvvError) {
      document.getElementById('cvv-error').style.visibility = 'visible';
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, addressLine, city, state, zipcode, creditCard } = this.state;

    const customer = {
      name,
      shippingAddress: `${addressLine} ${city}, ${state} ${zipcode}`,
      creditCard
    };

    this.props.placeOrder(customer);
  }

  handleNoSubmit(e) {
    e.preventDefault();
    this.showAllErrors();
  }

  showAllErrors() {
    document.getElementById('name-error').style.visibility = 'visible';
    document.getElementById('address-error').style.visibility = 'visible';
    document.getElementById('city-error').style.visibility = 'visible';
    document.getElementById('state-error').style.visibility = 'visible';
    document.getElementById('zipcode-error').style.visibility = 'visible';
    document.getElementById('credit-card-error').style.visibility = 'visible';
    document.getElementById('cvv-error').style.visibility = 'visible';
  }

  handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;
    const noNumbers = /[0-9]/g;
    const noLetters = /[A-Za-z]/g;

    switch (name) {
      case 'name':
        // Make the error element hidden
        document.getElementById('name-error').style.visibility = 'hidden';

        // Name is required
        if (!value) {
          this.setState({ nameError: 'Name is required' });

        // Name must be at least 5 characters
        } else if (value.length < 5) {
          this.setState({ nameError: 'Please enter at least 5 characters' });

          // If all conditions pass, remove any err messages if there are any
        } else {
          this.setState({ nameError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'addressLine':
        // Make the error element hidden
        document.getElementById('address-error').style.visibility = 'hidden';

        // Field is required
        if (!value) {
          this.setState({ addressError: 'Address is required' });

          // Input must be at least 6 characters long to be valid
        } else if (value.length < 6) {
          this.setState({ addressError: 'Please enter at least 6 characters for address' });

          // If all conditions pass, remove any err messages if there are any
        } else {
          this.setState({ addressError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'city':
        document.getElementById('city-error').style.visibility = 'hidden';
        value = value.replace(noNumbers, '');

        if (!value) {
          this.setState({ cityError: 'City is required' });
        } else if (value.length < 3) {
          this.setState({ cityError: 'Please enter at least 3 characters for city' });
        } else {
          this.setState({ cityError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'state':
        document.getElementById('state-error').style.visibility = 'hidden';
        value = value.replace(noNumbers, '');
        value = value.toUpperCase();

        if (!value) {
          this.setState({ stateError: 'State is required' });
        } else if (!isNaN(value)) {
          this.setState({ stateError: 'Please use 2 letter state code' });
        } else {
          this.setState({ stateError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'zipcode':
        document.getElementById('zipcode-error').style.visibility = 'hidden';
        value = value.replace(noLetters, '');

        if (!value) {
          this.setState({ zipcodeError: 'Zip is required' });
        } else if (isNaN(value)) {
          this.setState({ zipcodeError: 'Please use 2 letter state code' });
        } else {
          this.setState({ zipcodeError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'creditCard':
        document.getElementById('credit-card-error').style.visibility = 'hidden';
        value = value.replace(noLetters, '');

        if (!value) {
          this.setState({ creditCardError: 'Credit Card is required' });
        } else if (value.length < 15) {
          this.setState({ creditCardError: 'Invalid Credit Card Number' });
        } else {
          this.setState({ creditCardError: '' });
        }
        this.setState({ [name]: value });
        break;
      case 'cvv':
        document.getElementById('cvv-error').style.visibility = 'hidden';
        value = value.replace(noLetters, '');

        if (!value) {
          this.setState({ cvvError: 'CVV is required' });
        } else if (value.length < 2) {
          this.setState({ cvvError: 'Invalid CVV' });
        } else {
          this.setState({ cvvError: '' });
        }
        this.setState({ [name]: value });
        break;
      default:
        break;
    }
    // Create local variables from the state for err messages
    const { nameError, addressError, cityError, stateError, zipcodeError, creditCardError, cvvError } = this.state;

    if (!nameError && !addressError && !cityError && !stateError && !zipcodeError && !creditCardError && !cvvError) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  render() {
    const { total } = this.props;
    const { isValid } = this.state;
    const { name, addressLine, city, state, zipcode, creditCard, cvv } = this.state;
    const { nameError, addressError, cityError, stateError, zipcodeError, creditCardError, cvvError } = this.state;

    return (
      <section className="container w-40 checkout-container">
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
            <form onSubmit={ this.handleSubmit }>
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={ this.handleChange }
                    onBlur={ this.showErrors }
                    value={ name }
                    maxLength="65"
                    required
                  />
                  <div id="name-error">
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
                    onBlur={ this.showErrors }
                    value={ addressLine }
                    maxLength="42"
                    required
                  />
                  <div id="address-error">
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
                      onBlur={ this.showErrors }
                      value={ city }
                      maxLength="50"
                      required
                    />
                    <div id="city-error">
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
                      onBlur={ this.showErrors }
                      value={ state }
                      maxLength="2"
                      required
                    />
                    <div id="state-error">
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
                      onBlur={ this.showErrors }
                      value={ zipcode }
                      maxLength="5"
                      required
                    />
                    <div id="zipcode-error">
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
                      onBlur={ this.showErrors }
                      value={ creditCard }
                      maxLength="16"
                      required
                    />
                    <div id="credit-card-error">
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
                      onBlur={ this.showErrors }
                      value={ cvv }
                      maxLength="4"
                      required
                    />
                    <div id="cvv-error">
                      { cvvError && cvvError }
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  {
                    isValid
                      ? <button type="submit" className="btn btn-complete">Purchase</button>
                      : <button type="button" className="btn btn-incomplete" onClick={ this.handleNoSubmit } >Complete Form</button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-3">
            <a href="" onClick={ () => this.props.setView('confirmOrder', {}) }>
              &lt; Continue Shopping
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default CheckoutForm;
