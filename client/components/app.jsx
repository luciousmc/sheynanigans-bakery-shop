import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header />
          <ProductList setView={ this.setView } />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header />
          <ProductDetails params={ this.state.view.params } setView={ this.setView }/>
        </React.Fragment>
      );
    }
  }
}

export default App;
