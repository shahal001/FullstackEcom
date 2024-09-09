import React, { useEffect, useState } from "react";
import { CartData } from "../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../Server";
import { MdPayments } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();
  const [address, setAddress] = useState(null);
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // Fetch the address for the current user
  const fetchAddress = async () => {
    try {
      const { data } = await axios.get(`${server}/address/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Payment functions
  const paymentCod = async() => {
    setLoading(true)
    try {
    const { data } = await axios.post(
      `${server}/order/new`,
      { method, phone: address.phone, address: address.address },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    
    toast.success(data.message);
    navigate("/orderSuccess");
    fetchCart();
    setLoading(false);
  } catch(error){
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };

  const  paymentOnline = () => {
    console.log("Proceeding with cash on delivery (COD)");
    // Add your logic for COD payment here
  };

  return (
    <>
    {
      loading ? (<Loader/>):(
        <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="font-bold text-4xl text-gray-800 mb-6 text-center">Proceed to Payment</h1>

      <h2 className="text-2xl font-semibold text-gray-700">Your Cart</h2>
      <div className="space-y-4">
        {cart &&
          cart.map((e, i) => (
            <div
              key={i}
              className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4"
            >
              <img
                src={`http://localhost:8000/${e.product.image}`}
                alt="Product"
                className="w-32 h-32 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-xl font-medium text-gray-800">{e.product.title}</p>
                <p className="text-gray-600">Price: Rs {e.product.price}</p>
                <p className="text-gray-600">Quantity: {e.quantity}</p>
                <p className="text-gray-600">Stock: {e.product.stock}</p>
              </div>
            </div>
          ))}
      </div>

      {address && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Shipping Address</h2>
          <p className="text-gray-700">Address: {address.address}</p>
          <p className="text-gray-700">Phone: <span className="text-blue-500">{address.phone}</span></p>
        </div>
      )}

      <div className="flex justify-between items-center py-4 border-t border-gray-300">
        <span className="text-xl font-semibold text-green-600">Subtotal: Rs {subTotal}</span>
      </div>

      <div className="space-y-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"
        >
          <option>Choose Payment Method</option>
          <option value="cod">Cash on Delivery (COD)</option>
          <option value="online">Online Payment</option>
        </select>

        <button
          onClick={() => (method === "cod" ? paymentCod() : paymentOnline())}
          className="w-full bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 active:scale-95 transition-transform flex justify-center items-center gap-2"
        >
          <MdPayments className="text-2xl" /> Proceed to Pay
        </button>
      </div>
    </div>
      )
    }
    </>
  );
};

export default Payment;
