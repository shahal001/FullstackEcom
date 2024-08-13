// src/Home.jsx
import React from "react";
import Header from "../Components/Header";
import MainBanner from "../Components/MainBanner";
import Container from "../Components/Container";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Header/>
      <MainBanner/>
      <Container/>
      <Products/>
    </div>
  );
};

export default Home;
