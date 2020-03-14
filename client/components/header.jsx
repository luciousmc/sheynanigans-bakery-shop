import React from 'react';

function Header(props) {
  const itemAmt = props.cartItemAmt;
  let cartText = '';

  if (itemAmt < 2 && itemAmt > 0) {
    cartText = itemAmt + ' item';
  } else {
    cartText = itemAmt + ' items';
  }
  return (
    <header className="header container-fluid mb-2">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 d-flex justify-content-center">
          <img className="p-2 m-2" src="/images/bakery/logo_pink.png" alt="Logo" onClick={ () => props.setView('catalog', {}) }/>
        </div>
        <div className="col-4">
          <p
            onClick={ () => props.setView('cart', {}) }
            className="cart-count text-white text-right p-3 ml-auto">
            { cartText }
            <span className="icon"><i className="fas fa-shopping-cart fa-2x"></i></span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
