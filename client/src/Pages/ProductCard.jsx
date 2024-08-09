import React from "react";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  

  return (
    <div className="border p-4 rounded-md shadow-sm w-72 flex flex-col items-center">
      <div className="mb-4 ">
      <img
  src={`http://localhost:8000/${product.image}`} // Corrected URL
  alt={product.title}
  className="w-full h-48 object-cover rounded-md"
/>

      </div>
      <div className="mb-2">
        <div className="text-lg font-bold">{product.title}</div>
        <div className="text-gray-600">{product.description}</div>
      </div>
      <div className="mb-4">
        <div className="text-xl font-semibold">Rs {product.price}</div>
      </div>
      <button
        onClick={() => navigate(`/product/${product._id}`)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;
