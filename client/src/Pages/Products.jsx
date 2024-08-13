import React, { useContext } from "react";
import { ProductData } from "../Context/ProductContext";
import ProductCard from "../Pages/ProductCard";
import Loader from "../Components/Loader";

const Products = () => {
  const { products, loading } = ProductData();

  return (
    <div>
      <div className="flex items-center pl-2 gap-2">
        <h3 className="text-xl">Our Products</h3>
        <div className="p-2 text-white bg-gray-600 rounded-sm tracking-wide font-semibold">
          All Products
        </div>
      </div>
      <div className="grid grid-cols-2 p-1 gap-1 md:grid-cols-3 lg:grid-cols-4  ">
        {loading ? (
          <Loader />
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </div>
  );
};

export default Products;
