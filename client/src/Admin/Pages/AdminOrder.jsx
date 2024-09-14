import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../Server";
import toast from "react-hot-toast";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchAdminOrder = async () => {
    try {
      const { data } = await axios.get(`${server}/order/all/admin`, {
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
    fetchAdminOrder();
  }, []);

  const updateStatus = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/order/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchAdminOrder(); // Re-fetch orders after updating the status
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const totalSubTotal = orders.reduce((total, order) => total + order.subTotal, 0);

  return (
    <div className="p-6">
      {/* Total Revenue */}
      <h4 className="text-2xl font-semibold mb-6 text-gray-800">
        Total Revenue: <span className="text-green-500">INR {totalSubTotal.toFixed(2)}</span>
      </h4>

      {/* Orders Table */}
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{order.address}</td>
                  <td className="py-3 px-6">Rs {order.subTotal.toFixed(2)}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-6">
                    {order.status === "Delivered" ? (
                      <span className="text-gray-500">Order delivered</span>
                    ) : (
                      <button
                        onClick={() => updateStatus(order._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Update Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No orders yet!</p>
      )}
    </div>
  );
};

export default AdminOrder;
