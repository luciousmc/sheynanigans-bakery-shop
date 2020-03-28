import React, { useEffect } from 'react';

function Header({ cartItemAmt, setView, calcTotal }) {

  // Updates the total of all items whenever an item is addded or removed from the cart
  useEffect(() => {
    calcTotal();
  }, [cartItemAmt]);

  return (
    <header className="header container-fluid mb-2">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 d-flex justify-content-center">
          <img className="p-2 m-2" src="/images/logo_pink.png" alt="Logo" onClick={ () => setView('catalog', {}) }/>
        </div>
        <div className="col-4">
          <p
            onClick={ () => setView('cart', {}) }
            className="cart-count text-white text-right p-3 ml-auto">
            {
              cartItemAmt + (
                cartItemAmt === 1
                  ? ' item'
                  : ' items'
              )
            }
            <span className="icon"><i className="fas fa-shopping-cart fa-2x"></i></span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
