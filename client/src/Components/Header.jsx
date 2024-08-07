import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use for navigation if using React Router

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative pt-[72px]">
      <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-20">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">MyCompany</Link>
          </div>

          {/* Menu for Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/products" className="hover:text-gray-400">Products</Link>
            <Link to="/account" className="hover:text-gray-400">Account</Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-16 left-0 w-full z-20 md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700`}>
          <Link to="/" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-600">Home</Link>
          <Link to="/products" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-600">Products</Link>
          <Link to="/account" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-600">Account</Link>
          <Link to="/login" onClick={closeMenu} className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white">Login</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
