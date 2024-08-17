import React from "react";
import { ProductData } from "../Context/ProductContext";
import ProductCard from "../Pages/ProductCard";
import Loader from "../Components/Loader";

const Products = () => {
  const {
    products,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    price,
    setPrice,
    categories,
  } = ProductData();

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
        <div className="space-y-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-50 outline-none p-3 rounded-md shadow-sm"
          />

          {/* Category Dropdown */}
          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-black"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {/* Price Range Slider */}
          <input
            type="range"
            min="0"
            max="7000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="relative h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <p>Minimum Price - ${price}</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
