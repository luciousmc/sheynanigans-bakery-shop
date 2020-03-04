import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'cart',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cartItems => {
        this.setState({ cart: cartItems });
      });
  }

  addToCart(product) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };

    fetch('/api/cart', fetchOptions)
      .then(response => response.json())
      .then(item => {
        if (Object.prototype.hasOwnProperty.call(item, 'error')) {
          return;
        }
        this.setState({ cart: [...this.state.cart, item] });
      });
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
          <ProductList setView={ this.setView } />
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
          <ProductDetails
            params={ this.state.view.params }
            setView={ this.setView }
            addToCart={ this.addToCart }
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
          <CartSummary list={ this.state.cart } setView={ this.setView } />
        </React.Fragment>
      );
    }
  }
}

export default App;
