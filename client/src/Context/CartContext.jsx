import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../Server";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [datas, setDatas] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${server}/cart/all`, {
        headers: {
          token,
        },
      });

      setCart(data.cart);
      setTotalItems(data.sumOfQuantities);
      setSubTotal(data.subTotal);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart data");
    }
  };

  const addTocart = async (product) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/cart/new`,
        { product },
        { headers: { token } }
      );

      if (data.message) {
        toast.success(data.message);
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (action, id) => {
    try {
      const { data } = await axios.put(
        `${server}/cart?action=${action}`,
        { id },
        {
          headers: {
            token,
          },
        }
      );

      // console.log("API Response:", data); // Log the API response to see its structure

      setDatas(data); // Update stock with the response data

      // console.log("Updated stock:", data); // Log the updated stock

      fetchCart(); // Refresh the cart state
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating cart");
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/cart/${id}`, {
        headers: {
          token,
        },
      });
      
      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error removing cart cart item"
      );
    }
  };

  useEffect(() => {
    fetchCart();
  },[]);

  return (
    <CartContext.Provider
      value={{
        cart,
        subTotal,
        totalItems,
        addTocart,
        loading,
        updateCart,
        removeFromCart,
        datas,
        fetchCart,
        
      }}
    >
      {children}
      <Toaster />
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
