import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Accounts,
  Products,
  Signup,
  Verify,
  ProductDetails,
  Carts,
  Checkout,
  Payment,
  OrderSuccess,
  Orders,
  OrderPage,
  Dashboard,
} from "./Routes";
import { UserData } from "./Context/UserContext";
import Loader from "./Components/Loader";
import Header from "./Components/Header";

const App = () => {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={isAuth ? <Home /> : <Signup />} />
            <Route path="/account" element={isAuth ? <Accounts user={user} /> : <Login />}/>
            <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
            <Route path="/product" element={<Products />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/cart" element={isAuth ? <Carts /> : <Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:id" element={isAuth ? <Payment /> : <Login />} />
            <Route path="/orderSuccess" element={isAuth ? <OrderSuccess /> : <Login />}/>
            <Route path="/orderpage/:id" element={isAuth ? <OrderPage /> : <Login />}/>
            <Route path="/admin/dashboard" element={isAuth ? <Dashboard user = {user} /> : <Login />}/>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
