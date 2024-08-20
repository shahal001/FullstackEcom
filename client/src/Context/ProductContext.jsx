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
  const [searchQuery, setSearchQuery] = useState(""); // Separate state for the search query
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/all`, {
        params: { search: searchQuery, category, price, page }, // Use searchQuery instead of search
      });
      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategories(data.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category, price, page]);

  return (
    <ProductContext.Provider
      value={{
        products,
        topProducts,
        totalPages,
        loading,
        search,
        setSearch,
        setSearchQuery, // Pass the setSearchQuery function to update the search query
        category,
        setCategory,
        price,
        setPrice,
        page,
        setPage,
        categories,
        setCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
