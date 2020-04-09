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
    if (this.state.products.length < 1) {
      return (
        <div className="loading-gif text-center mt-5">
          <img src="/images/bakery/loader/2.gif" alt="Loading GIF"/>
        </div>
      );
    } else {
      return (
        <section className="container mt-4">
          <div className="row">
            {
              this.state.products.map(product => {
                return <ProductListItem
                  setView={ this.props.setView }
                  product={ product }
                  key={ product.productId }/>;
              })
            }
          </div>
        </section>
      );
    }
  }
}

export default ProductList;
