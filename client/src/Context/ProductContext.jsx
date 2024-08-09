import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server"; // Ensure the server variable is correctly imported

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [product, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${server}/product/all`);
      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ product, topProducts, totalPages, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
