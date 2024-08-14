import React, { useContext } from "react";
import { ProductData } from "../Context/ProductContext";
import ProductCard from "../Pages/ProductCard";
import Loader from "../Components/Loader";

const Products = () => {
  const { products, loading, category } = ProductData();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Our Products</h3>
        <div className="px-4 py-2 text-white bg-gray-700 rounded-lg tracking-wide font-semibold">
          All Products
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4">Filters</h1>
        <form className="space-y-4">
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-blue-50 outline-none p-3 rounded-md shadow-sm"
          />
        </form>
        <label>
          Category
          <select className="w-full text-black">
            {category.map((p)=>(
              <option key={p} value={p}>{p}</option> 
            ))} 
          </select>
        </label>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* {console.log(category)} */}
        {/* {console.log(products)} */}
        {loading ? (
          <Loader />
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No Products</p>
        )}
      </div>
    </div>
  );
};

export default Products;
