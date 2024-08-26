import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./Context/ProductContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <App/>
        </CartContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
