import React from "react";
import { ProductData } from "../Context/ProductContext";
import ProductCard from "../Pages/ProductCard";
import Loader from "./Loader";

const Container = () => {
  const { topProducts, loading } = ProductData();

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-center tracking-wide gap-2">
        <h4 className="text-lg md:text-xl">Our products</h4>
        <h2 className="p-2 bg-slate-500 text-white rounded-sm text-sm md:text-base lg:text-lg">
          Top selling
        </h2>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-2">
        {loading ? (
          <Loader />
        ) : topProducts && topProducts.length > 0 ? (
          topProducts.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-64 md:w-1/3 lg:w-1/4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No Products Yet.</p>
        )}
      </div>
    </div>
  );
};

export default Container;
