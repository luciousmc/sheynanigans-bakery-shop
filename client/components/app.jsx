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
    return (
      <React.Fragment>
        <Header />
        {
          this.state.view.name === 'catalog'
            ? <ProductList setView={ this.setView }/>
            : <ProductDetails params={ this.state.view.params } />
        }
        <ProductList />
      </React.Fragment>
    );
  }
}

export default App;
