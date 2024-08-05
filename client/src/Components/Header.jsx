import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="your-logo.png" alt="Company Logo" className="h-8 w-8 mr-2"/>
          <span className="text-white text-xl font-bold">Company</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
          <Link to="/account" className="text-gray-300 hover:text-white">Account</Link>
        </div>
        <div className="hidden md:block">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block text-gray-300 hover:text-white p-2">Home</Link>
          <Link to="/products" className="block text-gray-300 hover:text-white p-2">Products</Link>
          <Link to="/account" className="block text-gray-300 hover:text-white p-2">Account</Link>
          <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 mx-2">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Header;