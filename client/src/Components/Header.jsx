import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../src/Context/UserContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { CartData } from "../Context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuth, isAuth } = UserData(); // Get isAuth from UserData context
  
  const {totalItems} = CartData()

  const logoutHandler = () => {
    localStorage.clear();
    setUser({});
    setIsAuth(false);
    toast.success("Logout");
    navigate("/"); // Redirect to homepage or login after logout
  };

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
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/product" className="hover:text-gray-400">
              Products
            </Link>
            {isAuth && (
              <Link to="/account" className="hover:text-gray-400">
                Account
              </Link>
            )}
          </div>

          {/* Login/Logout Button */}
          <div className="  hidden md:block ">
            {isAuth && (
              <button className="p-2">
                <Link className="flex" to="/cart">
                  <FiShoppingCart className="text-2xl" />
                  <div className="text-sm relative bottom-4 -left-2 rounded-full flex items-center justify-center h-7 w-7  bg-green-500 ">{totalItems}</div>
                </Link>
              </button>
            )}

            {isAuth ? (
              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full z-20 flex flex-col items-center p-2 md:hidden ${
            isOpen ? "block" : "hidden"
          } bg-gray-700`}
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            Home
          </Link>
          <Link
            to="/product"
            onClick={closeMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            Products
          </Link>
          <Link
            to="/account"
            onClick={closeMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            Account
          </Link>
          {isAuth && (
            <Link
              to="/cart"
              onClick={closeMenu}
              className="block px-4 py-2 hover:bg-gray-600"
            >
              Your Carts
            </Link>
          )}

          {isAuth ? (
            <button
              onClick={() => {
                logoutHandler();
                closeMenu();
              }}
              className="block px-4 py-2 bg-red-500 hover:bg-red-600 text-white w-full rounded-sm text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded-sm text-center"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
