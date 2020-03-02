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
        <section className="container">
          <div className="row">
            <div className="col-12">
              <a href="#" onClick={ () => this.props.setView('catalog', {}) }>&lt; Return to Catalog</a>
            </div>
          </div>
          <div className="row">
            <div className="col-7 product-detail-img">
              <img src={ product.image } alt=""/>
            </div>
            <div className="col 5">
              <h3>{ product.name }</h3>
              <p className="lead">{ '$' + (product.price / 100).toFixed(2) }</p>
              <p>{ product.shortDescription }</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>{ product.longDescription }</p>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default ProductDetails;