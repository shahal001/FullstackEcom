import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accounts, Home, Login, Products,Signup, Verify } from "./Routes";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/account" element={<Accounts />} />
          <Route path="/product" element={<Products />} />
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
