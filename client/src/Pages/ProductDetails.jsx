import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../Server";
import { CartData } from "../Context/CartContext";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { addTocart } = CartData();

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${server}/product/${params.id}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const addToCartHandler = async (product) => {
    await addTocart(product);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <div className="w-full">
          {product.image && (
            <img
              src={`http://localhost:8000/${product.image}`}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          {/* Product Title & Brand */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-500">Brand: {product.title }</p>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Details:</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Category and Stock */}
          <div className="flex flex-col space-y-1">
            <div className="text-blue-600 font-medium">Category: {product.category}</div>
            <div className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              Stock: {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-gray-900">
            Rs {product.price}
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-3">
            <button
              onClick={() => addToCartHandler(product._id)}
              className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
