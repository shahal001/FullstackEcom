import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../Server";
import { CartData } from "../Context/CartContext";
import { UserData } from "../Context/UserContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [stock, setStock] = useState("");
  const params = useParams();
  const { addTocart } = CartData();
  const { isAuth, user } = UserData();



  // Fetch single product
  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${server}/product/${params.id}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  // Update stock
  const stockUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${server}/product/${params.id}`,
        { stock },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchSingleProduct(); // Refetch product to update stock
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    setStock("");
  }, [params.id]); // Added params.id to dependency array

  // Add to cart handler
  const addToCartHandler = async (product) => {
    if (product && product._id) {
      await addTocart(product);
    }
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
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-500">Brand: {product.brand}</p>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Details:</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Category and Stock */}
          <div className="flex flex-col space-y-1">
            <div className="text-blue-600 font-medium">
              Category: {product.category}
            </div>
            <div>
              {user.role === "admin" && (
                <>
                  <input
                    type="number"
                    value={stock}
                    placeholder="Stock Update"
                    required
                    onChange={(e) => setStock(e.target.value)}  // Corrected the onChange
                    className="border p-2"
                  />
                  <button
                    onClick={stockUpdate} // Corrected onClick function
                    className="p-2 bg-blue-500 text-white ml-2"
                  >
                    Update Stock
                  </button>
                </>
              )}
            </div>
            <div
              className={`font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Stock:{" "}
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of Stock"}
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-gray-900">
            Rs {product.price}
          </div>

          {/* Add to Cart Button */}
          {isAuth ? (
            <div className="flex space-x-3">
              <button
                onClick={() => addToCartHandler(product)}
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
          ) : (
            <p>
              Please login to your account.{" "}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
