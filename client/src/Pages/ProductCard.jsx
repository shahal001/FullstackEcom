import React from "react";
import { useNavigate } from "react-router-dom";




const ProductCard = ({ product }) => {
  const navigate = useNavigate();


  return (
    <div className="flex-none bg-gray-600 shadow-md rounded-lg overflow-hidden ">
      <div>
        <img
          src={`http://localhost:8000/${product.image}`}
          alt={product.title}
          className="w-full h-44 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <h3 className="text-md text-gray-700">{product.price}</h3>
        
        <button 
          onClick={() => navigate(`/product/${product._id}`)} 
          className="mt-2 text-white bg-blue-600 px-4 py-2 rounded"
        >
          View Item
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
