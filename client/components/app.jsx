import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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
        this.setState({ cart: [...this.state.cart, item] });
      })
      .catch(error => console.error(error));
  }

  placeOrder(customer) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    };

    fetch('/api/orders', fetchOptions)
      .then(() => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      });
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    let renderComp;

    if (this.state.view.name === 'catalog') {
      renderComp = <ProductList setView={ this.setView } />;
    } else if (this.state.view.name === 'details') {
      renderComp = (
        <ProductDetails
          params={ this.state.view.params }
          setView={ this.setView }
          addToCart={ this.addToCart }
        />);
    } else if (this.state.view.name === 'cart') {
      renderComp = <CartSummary list={ this.state.cart } setView={ this.setView } />;
    } else {
      renderComp = (
        <CheckoutForm
          setView={ this.setView }
          placeOrder={ this.placeOrder }
          total={ this.state.view.params.total }
        />
      );
    }

    return (
      <React.Fragment>
        <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
        { renderComp }
      </React.Fragment>
    );

    /// ///////
    // if (this.state.view.name === 'catalog') {
    //   return (
    //     <React.Fragment>
    //       <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
    //       <ProductList setView={ this.setView } />
    //     </React.Fragment>
    //   );
    // } else if (this.state.view.name === 'details') {
    //   return (
    //     <React.Fragment>
    //       <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
    //       <ProductDetails
    //         params={ this.state.view.params }
    //         setView={ this.setView }
    //         addToCart={ this.addToCart }
    //       />
    //     </React.Fragment>
    //   );
    // } else if (this.state.view.name === 'cart') {
    //   return (
    //     <React.Fragment>
    //       <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
    //       <CartSummary list={ this.state.cart } setView={ this.setView } />
    //     </React.Fragment>
    //   );
    // } else {
    //   return (
    //     <React.Fragment>
    //       <Header cartItemAmt={ this.state.cart.length } setView={ this.setView } />
    //       <CheckoutForm setView={ this.setView } placeOrder={ this.placeOrder } total={ this.state.view.params.total }/>
    //     </React.Fragment>
    //   );
    // }
  }
}

export default App;
