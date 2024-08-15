import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]); // Initialize as an empty string
  const [price, setPrice] = useState(""); // Initialize as an empty string
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/all`);

      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategory(data.categorys); // Make sure `data.categorys` is an array of categories
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const results = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search, products]);

  return (
    <ProductContext.Provider
      value={{
        products:filteredProducts,
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
