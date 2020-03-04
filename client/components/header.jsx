import React from 'react';

function Header(props) {
  return (
    <header className="header container-fluid mb-5">
      <img className="p-2 m-2" src="/images/favicon.png" alt="Logo"/>
      <h1 className="text-white d-inline-block">Wicked Sales</h1>
    </header>
  );
}

export default Header;
