import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../Server";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/order`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h1>

      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Method</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Subtotal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{order.subTotal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex leading-5 font-semibold rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/orderpage/${order._id}`)}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 active:scale-95 transition-transform"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-600">No orders placed yet.</h1>
        </div>
      )}
    </div>
  );
};

export default Orders;
