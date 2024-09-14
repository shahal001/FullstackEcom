import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../Server";
import axios from "axios";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const params = useParams();

  const fetchMyOrder = async () => {
    try {
      const { data } = await axios.get(`${server}/order/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setOrder(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, [params.id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Order Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order ID:{" "}
          <span className="font-normal text-gray-600">{order._id}</span>
        </h2>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Shipping Details</h3>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Payment & Status</h3>
            <p>Payment Method: {order.method}</p>
            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              Total:{" "}
              <span className="font-bold text-lg">₹{order.subTotal}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className=" items-center text-xl font-semibold text-gray-800 mb-4">
          Ordered Products
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  No
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {item.product.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    ₹{item.product.price}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <img
                     src={`http://localhost:8000/${item.product.image}`}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-700">
                    ₹{item.quantity * item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
