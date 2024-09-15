import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../Server";
import { ProductData } from "../Context/ProductContext";

const ProductCard = ({ product, admin }) => {
  const navigate = useNavigate();
  const { fetchAdminProducts } = ProductData();

  const deleteHandler = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(`${server}/product/${product._id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchAdminProducts();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img
          src={`http://localhost:8000/${product.image}`}
          alt={product.title}
          className="w-full h-44 object-cover"
        />
        
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <h3 className="text-md text-gray-500 mb-2">Price: ₹ {product.price}</h3>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Item
          </button>
          {admin && (
            <button
              onClick={deleteHandler}
              className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
