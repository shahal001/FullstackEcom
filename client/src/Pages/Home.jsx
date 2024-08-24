// src/Home.jsx
import React from "react";

import MainBanner from "../Components/MainBanner";
import Container from "../Components/Container";
import Products from "./Products";


const Home = () => {
  
  return (
    <div>
      
      <MainBanner/>
      <Container/>
      <Products/>
    </div>
  );
};

export default Home;
