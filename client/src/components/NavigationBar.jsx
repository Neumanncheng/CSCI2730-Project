// components/NavigationBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Market Dapp</h1>
        <div>
          <Link to="/" className="text-white px-4 hover:text-blue-200 transition duration-200">Home</Link>
          <Link to="/buy" className="text-white px-4 hover:text-blue-200 transition duration-200">Buy</Link>
          <Link to="/sell" className="text-white px-4 hover:text-blue-200 transition duration-200">Sell</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;