import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/' + this.props.params.productId)
      .then(response => response.json())
      .then(data => {
        this.setState({ product: data });
      });
  }

  render() {
    if (!this.state.product) {
      return (
        <h1>Loading...</h1>
      );
    } else {
      const { product } = this.state;
      return (
        <section className="container mb-3 w-75 rounded detail-container">
          <div className="row">
            <div className="col-12 p-3">
              <a href="#" onClick={ () => this.props.setView('catalog', {}) }>&lt; Return to Catalog</a>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-5 product-detail-img" style={{ background: `url(${product.image}) no-repeat center/85%` }}>
              {/* <img src={ product.image } alt=""/> */}
            </div>
            <div className="col-7">
              <h3>{ product.name }</h3>
              <p className="lead">{ '$' + (product.price / 100).toFixed(2) }</p>
              <p>{ product.shortDescription }</p>
              <div onClick={ () => this.props.addToCart(product) } className="btn btn-primary btn-add-to-cart">
                Add to Cart
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="p-3">{ product.longDescription }</p>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default ProductDetails;
