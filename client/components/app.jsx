/* eslint-disable no-console */
import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import DisclaimerModal from './disclaimer';
import ItemAddedModal from './item-added-modal';
import ConfirmDeleteModal from './confirm-delete-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemAddedModal: false,
      showModal: false,
      showConfirmDeleteModal: false,
      view: {
        name: 'cart',
        params: {}
      },
      cart: [],
      cartTotal: 0
    };
    this.setView = this.setView.bind(this);
    this.removeModal = this.removeModal.bind(this);
    this.showItemAddedModal = this.showItemAddedModal.bind(this);
    this.hideItemAddedModal = this.hideItemAddedModal.bind(this);
    this.showConfirmDeleteModal = this.showConfirmDeleteModal.bind(this);
    this.hideConfirmDeleteModal = this.hideConfirmDeleteModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeSingleItem = this.removeSingleItem.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  /**
   * Once the component loads, get the cart items from the database
   */
  componentDidMount() {
    this.getCartItems();
  }

  /**
   * Calculates the current total cost of all items added to the cart
   */
  calcTotal() {
    const { cart } = this.state;
    const cartLen = cart.length;
    let subTotal = 0;

    for (let item = 0; item < cartLen; item++) {
      subTotal += cart[item].price;
    }
    this.setState({ cartTotal: subTotal });
  }

  /**
   * Sends a request to the server API to get all items in the cart
   */
  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cartItems => {
        this.setState({ cart: cartItems });
      });
  }

  /**
   * Hides the disclaimer Modal
   */
  removeModal() {
    this.setState({ showModal: false });
  }

  /**
   * Displays the modal that will ask user for further action after adding an item to the cart
   */
  showItemAddedModal() {
    if (this.state.view.name === 'details') {
      this.setState({ showItemAddedModal: true });
    }
  }

  /**
   * Hides the modal where the item was added
   */
  hideItemAddedModal() {
    this.setState({ showItemAddedModal: false });
  }

  /**
   * Shows a confirmation modal to verify if user wants to remove an Item from the cart
   * @typedef {Object} Product Object that holds all the product information
   * @property {number} productId - Product Id
   * @property {number} cartItemId - Id of the item in the cart
   * @property {string} name - The name of the product
   * @property {number} price - The price of a single item
   * @property {string} shortDescription - Short description of the product to be displayed on the card
   * @property {string} longDescription - The full text description of th product to be displayed on details
   * @param {number} productAmt - The amount of the product currently in the cart
   */
  showConfirmDeleteModal(product, productAmt) {
    this.setState({
      showConfirmDeleteModal: true,
      view: {
        name: 'cart',
        params: {
          product,
          productAmt
        }
      }
    });
  }

  /**
   * Hides the modal to verify the user wants to delete an item from the cart
   */
  hideConfirmDeleteModal() {
    this.setState({ showConfirmDeleteModal: false });
  }

  /**
   * Adds a single product to the cart
   * @param {{Object}} product - Takes an object filled with product data
   */
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
        this.setState({ cart: [...this.state.cart, item] }, this.showItemAddedModal);
      })
      .catch(error => console.error(error));
  }

  /**
   * Removes all added instances of a product from the cart
   * @param {number} productId - Takes the product Id to be removed from the cart. NOT the cartItemId
   */
  removeFromCart(productId) {
    fetch(`/api/cart/${productId}/all`, { method: 'DELETE' })
      .then(response => {

        if (response.ok) {
          let newCart = [...this.state.cart];

          newCart = newCart.filter(product => {
            if (product.productId !== productId) {
              return true;
            }
          });
          this.setState({ cart: newCart });
        }
      })
      .catch(error => console.error(error));
  }

  /**
   * Remove a single occurence of an item from the database
   * @param {number} cartItemId - Id of the cart item to be removed.
   */
  removeSingleItem(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' })
      .then(response => {

        if (response.ok) {
          let newCart = [...this.state.cart];

          newCart = newCart.filter(product => {
            if (product.cartItemId !== cartItemId) {
              return true;
            }
          });
          this.setState({ cart: newCart });
        }
      })
      .catch(error => console.error(error));
  }

  /**
   * Sends a request to the server API to place an order
   * @param {{Object}} customer - Takes an object filled with customer data
   */
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

  /**
   * Sets the view for the app. Default is 'catalog'.
   * @param {string} name - Name of the view to be displayed
   * @param {Object} params - Object holding aditional parameters for the view
   */
  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    let renderView;
    const overflow = this.state.showModal ? 'no-scroll' : 'scroll';

    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={ this.setView } />;
    } else if (this.state.view.name === 'details') {
      renderView = (
        <ProductDetails
          params={ this.state.view.params }
          setView={ this.setView }
          addToCart={ this.addToCart }
        />);
    } else if (this.state.view.name === 'cart') {
      renderView = (
        <CartSummary
          cartItems={ this.state.cart }
          setView={ this.setView }
          addToCart={ this.addToCart }
          removeFromCart={ this.removeFromCart }
          removeSingleItem={ this.removeSingleItem }
          showConfirmDeleteModal={ this.showConfirmDeleteModal }
          total={ this.state.cartTotal }
        />);
    } else {
      renderView = (
        <CheckoutForm
          setView={ this.setView }
          placeOrder={ this.placeOrder }
          total={ this.state.cartTotal }
        />
      );
    }
    return (
      <div className={ 'pb-5 ' + overflow }>
        { this.state.showModal &&
          <DisclaimerModal
            firstVisit={ this.state.showModal }
            removeModal={ this.removeModal }
          />
        }
        { this.state.showItemAddedModal &&
          <ItemAddedModal
            setView={ this.setView }
            hideItemAddedModal={this.hideItemAddedModal}
          />
        }
        { this.state.showConfirmDeleteModal &&
          <ConfirmDeleteModal
            hideConfirmDeleteModal={ this.hideConfirmDeleteModal }
            removeFromCart={ this.removeFromCart }
            productAmt={ this.state.view.params.productAmt }
            product={ this.state.view.params.product }
          />
        }

        <Header calcTotal={ this.calcTotal } cartItemAmt={ this.state.cart.length } setView={ this.setView } />
        { renderView }
      </div>
    );
  }
}

export default App;
