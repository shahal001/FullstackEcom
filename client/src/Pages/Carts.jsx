import React from "react";
import { CartData } from "../Context/CartContext";
import { Link } from "react-router-dom";

function Carts() {
  const { cart, subTotal,updateCart,removeFromCart } = CartData();

const updateCartHandler = async(action,id) => {
   await updateCart(action,id)
}
 

  console.log(subTotal);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart && cart.length > 0 ? (
        <table className="min-w-full border-collapse text-center ">
          <thead>
            <tr className="border-b font-semibold">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Product</th>

              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((e, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-semibold">{e.product.title}</td>

                <td className="px-4 py-2 ">
                  <Link to={`/product/${e.product._id}`}>
                    <img
                      src={`http://localhost:8000/${e.product.image}`}
                      alt="No image"
                      style={{ width: "60px" }}
                      className="rounded"
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 font-semibold ">
                  <button
                    className="p-1 text-lg"
                    onClick={() => updateCartHandler("inc", e._id)}
                  >
                    +
                  </button>
                  {e.quantity}
                  <button className="p-1 text-lg" onClick={() => updateCartHandler("dec", e._id)} >-</button>
                </td>

                <td className="px-4 py-2 font-semibold">
                  Rs {e.product.price * e.quantity}
                </td>

                <td className="px-4 py-2 font-semibold tracking-wide">
                  <button
                    onClick={() => removeFromCart(e._id)}
                    className="mt-2 text-white bg-blue-500 px-4 py-2 rounded active:bg-blue-700 transform active:scale-95 transition-colors duration-150"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in Cart</p>
      )}
      <div className="p-2 text-lg font-semibold">
        <h1>SubTotal</h1>
        <p className="flex gap-2">
          Total amount to be paid-Rs{" "}
          <div className="text-red-500">{subTotal}</div>{" "}
        </p>

        <button className="p-3 text-white  bg-blue-500 px-4 py-2 rounded active:bg-blue-700 transform active:scale-95 transition-colors duration-150 ">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Carts;
