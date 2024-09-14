import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ProductData } from "../Context/ProductContext";
import Home from "../Admin/Pages/Home";
import AdminOrder from './Pages/AdminOrder';

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  // Redirect if the user is not an admin
  if (user.role !== "admin") {
    navigate("/");
    return null; // Prevent further rendering
  }

  const { adminProduct} = ProductData();

  return (
    <div className="container mx-auto p-6">
      {/* Tabs Header */}
      <div className="flex justify-center space-x-4 border-b mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === "home" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          } hover:text-blue-500 transition`}
          onClick={() => setActiveTab("home")}
        >
          Admin Home
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "data" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          } hover:text-blue-500 transition`}
          onClick={() => setActiveTab("data")}
        >
          Data Page
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "orders" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          } hover:text-blue-500 transition`}
          onClick={() => setActiveTab("orders")}
        >
          Orders Page
        </button>
      </div>

      {/* Tabs Content */}
      <div className="p-6">
        {activeTab === "home" && <Home products={adminProduct} />}
        {activeTab === "data" && <div className="text-center">This is the Data Page</div>}
        {activeTab === "orders" && <AdminOrder/>}
      </div>
    </div>
  );
};

export default Dashboard;
