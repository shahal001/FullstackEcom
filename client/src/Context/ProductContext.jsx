import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Separate state for the search query
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1); // Use this page state
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totPage, setTotPage] = useState(0);
  const [adminProduct, setAdminProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/all`, {
        params: { search: searchQuery, category, price, page },
      });

      setProducts(data.product);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategories(data.categories || []);
      setTotPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/admin/all`);
      
      if (data && data.products) {
        setAdminProduct(data.products);
        setTotPage(data.totalPages);
      } else {
        console.log("No products available.");
      }
    } catch (error) {
      console.error("Error fetching admin products:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdminProducts();
    }, [searchQuery, category, price, page]); // Fetch products when any filter or page changes

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
        currentPage,
        setCurrentPage,
        totPage,
        setTotPage,
        adminProduct,
        fetchAdminProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
