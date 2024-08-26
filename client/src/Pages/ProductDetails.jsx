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

  const addToCartHandler = async () => {
    if (product._id) {
      await addTocart(product); // Pass the entire product object
    }
  };

  return (
    <div className="flex flex-row p-3">
      <div className="p-8">
        {product.image && (
          <img
            src={`http://localhost:8000/${product.image}`}
            alt={product.title}
          />
        )}
      </div>
      <div>
        <div className="flex gap-2">
          <div className="text-lg font-semibold text-red-600">Brand:</div>
          <div className="text-lg text-black font-semibold">{product.title}</div>
        </div>
        
        <p className="text-lg font-semibold">Details:</p>
        <h2>{product.description}</h2>
    
        <div className="flex gap-2">
          <div className="text-blue-500 font-medium tracking-wide">Category:</div>
          <h1>{product.category}</h1>
        </div>
        <h1 className="font-semibold text-xl">Rs {product.price}</h1>
        <button 
          onClick={addToCartHandler} 
          className="mt-2 text-white bg-blue-500 px-4 py-2 rounded active:bg-blue-700 transform active:scale-95 transition duration-150"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

