import React from 'react';

function ProductListItem(props) {
  return (
    <div className="col-4">
      <div className="card" style={ { width: '18rem' } }>
        <img className="card-img-top" src={ props.product.image } alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{ props.product.name }</h5>
          <p className="card-text lead">{ '$' + (props.product.price / 100).toFixed(2) }</p>
          <p className="card-text">{ props.product.shortDescription }</p>
          <a href="#"
            className="btn btn-primary"
            onClick={ () => props.setView('details', { productId: props.product.productId })}
          >More Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
