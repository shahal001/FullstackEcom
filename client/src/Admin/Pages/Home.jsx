import React, { useState } from "react";
import ProductCard from "../../Pages/ProductCard";
import { ProductData } from "../../Context/ProductContext";
import axios from "axios";
import { server } from "../../Server";
import toast from "react-hot-toast";

const Home = ({ products }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const { fetchAdminProducts } = ProductData();

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        All Products
      </h3>
      <AddProduct
        handleClose={handleClose}
        show={show}
        fetchAdminProducts={fetchAdminProducts}
      />
      <button
        onClick={handleOpen}
        className="p-2 bg-green-500 text-white font-semibold rounded-md mb-6 hover:bg-green-600 active:scale-95 transition-transform"
      >
        Add Product
      </button>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export const AddProduct = ({ handleClose, show, fetchAdminProducts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category,setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [sold, setSold] = useState("");
  const [error, setError] = useState("");

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const categories = ["SmartPhone", "T-shirt", "Laptop", "Shoes", "watch"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("category",category)
    formData.append("price", price);
    formData.append("image", image);
    formData.append("sold", sold);

    try {
      const { data } = await axios.post(`${server}/product/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      toast.success("Product added successfully");
      fetchAdminProducts();
      setTitle("");
      setDescription("");
      setStock("");
      setCategory("");
      setPrice("");
      setImage("");
      setSold("");
      handleClose();
    } catch (error) {
      setError("Failed to add product");
      console.error(error);
    }
  };

  return (
    <div>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Product
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {error && <div className="text-red-500">{error}</div>}

              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Product title"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product description"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="block text-gray-700 font-medium"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Product Stock"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-medium"
                >
                  Price
                </label>
                <input
                  type="tel"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Product Price"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="sold"
                  className="block text-gray-700 font-medium"
                >
                  Sold
                </label>
                <input
                  type="tel"
                  id="sold"
                  value={sold}
                  onChange={(e) => setSold(e.target.value)}
                  placeholder="Product Sold"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))}
              </select>

              <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={changeImageHandler} // This is correct
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
