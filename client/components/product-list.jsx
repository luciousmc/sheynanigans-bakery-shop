import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(productsObj => {
        this.setState({ products: productsObj })
      })
  }
  render() {
    return(
      <section className="container">
        <div className="row">
          { 
            this.state.products.map(product => {
            return <ProductListItem products={ this.state.products } />
            })
          }
        </div>
      </section>
    );
  }
}