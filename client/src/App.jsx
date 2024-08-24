import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Accounts, Products, Signup, Verify } from  "./Routes";
import { UserData } from "./Context/UserContext";
import Loader from "./Components/Loader";
import Header from "./Components/Header";

const App = () => {
  const { loading, isAuth } = UserData();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ isAuth? <Home/>:<Login />} />
            <Route path="/signup" element={isAuth ? <Home /> : <Signup />} />
            <Route path="/account" element={<Accounts />} />
            <Route path="/product" element={<Products />} />
            <Route path="/verify" element={isAuth? <Home/> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
