import React from "react";
import { CartData } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Carts() {
  const { cart, subTotal, updateCart, removeFromCart } = CartData();

  const updateCartHandler = async (action, id) => {
    try {
      await updateCart(action, id);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    console.log("Proceeding to checkout");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cart && cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg mb-4"
              >
                {/* Product Image */}
                <Link to={`/product/${e.product._id}`}>
                  <img
                    src={`http://localhost:8000/${e.product.image}`}
                    alt={e.product.title}
                    className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h2 className="text-xl font-semibold">
                    {e.product.title}
                  </h2>
                  <p className="text-gray-600">
                    ₹ {e.product.price} per item
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-l"
                    onClick={() => updateCartHandler("dec", e._id)}
                  >
                    -
                  </button>
                  <span className="px-4">{e.quantity}</span>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-r"
                    onClick={() => updateCartHandler("inc", e._id)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <p className="text-lg font-semibold">
                  ₹ {e.product.price * e.quantity}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(e._id)}
                  className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 active:scale-95 transition-transform"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium">Subtotal</p>
              <p className="text-lg font-semibold text-green-600">₹ {subTotal}</p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>

            {/* Empty Cart Message (only if needed) */}
            {cart.length === 0 && (
              <p className="mt-4 text-center text-red-500 font-semibold">
                Your cart is empty!
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-2xl font-semibold text-red-500 text-center">
          No items in your cart!
        </p>
      )}
    </div>
  );
}

export default Carts;
