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
    <header className="header container-fluid mb-5">
      <div className="row">
        <div className="col">
          <img className="p-2 m-2" src="/images/favicon.png" alt="Logo"/>
        </div>
        <div className="col">
          <h1 className="text-white text-center d-inline-block">Wicked Sales</h1>
        </div>
        <div className="col">
          <p className="cart-count text-white text-right p-2">{ cartText } <span className="icon"><i className="fas fa-shopping-cart"></i></span></p>
        </div>
      </div>
    </header>
  );
}

export default Header;
