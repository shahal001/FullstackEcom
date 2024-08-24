import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; 
import { ProductContextProvider } from "./Context/ProductContext.jsx";
import {UserContextProvider} from "./Context/UserContext.jsx"
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <UserContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
    </UserContextProvider>
  </React.StrictMode>
  
);
