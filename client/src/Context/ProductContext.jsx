import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(""); // Single selected category
  const [categories, setCategories] = useState([]); // All available categories

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/all`, {
        params: { search, category, price, page },
      });
      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategories(data.categories || []); // Set categories from backend response
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [category, search, price, page]);

  return (
    <ProductContext.Provider
      value={{
        products,
        topProducts,
        totalPages,
        loading,
        search,
        setSearch,
        category,
        setCategory,
        price,
        setPrice,
        page,
        setPage,
        categories, 
        setCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
