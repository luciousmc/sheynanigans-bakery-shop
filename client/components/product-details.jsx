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
    const { product } = this.state;

    if (!product) {
      return (
        <div className="loading-gif text-center mt-5">
          <img src="/images/bakery/loader/2.gif" alt="Loading GIF"/>
        </div>
      );
    } else {
      return (
        <section className="container mb-3 w-75 rounded detail-container">
          <div className="row">
            <div className="col-12 p-3">
              <div className="d-inline lead text-primary link" onClick={ () => this.props.setView('catalog', {}) }>&lt; Return to Catalog</div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-5 product-detail-img" style={{ background: `url(${product.image}) no-repeat center/85%` }}>
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
