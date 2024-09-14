import React, { useState } from 'react';
import ProductCard from '../../Pages/ProductCard';
import { ProductData } from '../../Context/ProductContext';

const Home = ({ products }) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen  = () => setShow(true);
  const {fetchAdminProducts} = ProductData();
    return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Products</h3>
      <button className="p-2 bg-green-500 text-white font-semibold rounded-md mb-6 hover:bg-green-600 active:scale-95 transition-transform">
        Add Product
      </button>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} admin={true} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default Home;
