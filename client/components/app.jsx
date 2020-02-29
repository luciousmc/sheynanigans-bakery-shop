import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <ProductList />
      </React.Fragment>
    );
  }
}

export default App;
