import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(productsObj => {
        this.setState({ products: productsObj });
      });
  }

  render() {
    return (
      <section className="container">
        <div className="row">
          {
            this.state.products.map(product => {
              return <ProductListItem product={ product } key={ product.productId }/>;
            })
          }
        </div>
      </section>
    );
  }
}

export default ProductList;
