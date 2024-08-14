import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server"; // Ensure the server variable is correctly imported

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  
  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${server}/product/all`);
      console.log("data:", data);
      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategory(data.categorys);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  console.log(category)

  useEffect(() => {
    fetchProducts();
  }, []);

  
  return (
    <ProductContext.Provider
      value={{ products, topProducts, totalPages, loading, category }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
