import React from 'react';
import { ProductData } from '../Context/ProductContext';
import ProductCard from '../Pages/ProductCard'; // Ensure ProductCard is correctly imported

const Container = () => {
    const { topProducts, loading } = ProductData();

    return (
        <div className="">
            <div className="flex items-center tracking-wide gap-2">
                <h4>Our products</h4>
                <h2 className="p-2 bg-slate-500 text-white rounded-sm">Top selling</h2>
            </div>
            <div>
                {loading ? (
                    <p>Loading...</p> // Show loading state
                ) : topProducts && topProducts.length > 0 ? (
                    topProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No Products Yet.</p> // Show message if no products
                )}
            </div>
        </div>
    );
}

export default Container;

