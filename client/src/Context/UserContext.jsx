import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../Server";
import toast, { Toaster } from "react-hot-toast";



const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

 

  const userLogin = async (email, password,navigate) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/user/login`, { email, password });

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setIsAuth(true);
        setUser(data.user);
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/user/myprofile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password,navigate) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/user/signup`, { name, email, password });

      if (data.message) {
        setLoading(false)
        toast.success(data.message);
        localStorage.setItem("activationToken", data.activationToken);
        navigate("/verify")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (otp,navigate) => {
    const activationToken = localStorage.getItem("activationToken") 
    try{
    const {data} = await axios.post(`${server}/user/verify`,{activationToken,otp})

    if(data.message){
      localStorage.clear()
      navigate("/login")
      toast.success(data.message)
    }
   
    }catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        userLogin,
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        registerUser,
        verifyUser,
      }}
    >
      {children}
      <Toaster />
    </userContext.Provider>
  );
};

export const UserData = () => useContext(userContext);
