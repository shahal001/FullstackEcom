import React from "react";
import { useNavigate } from "react-router-dom";

const Accounts = ({ user }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
        <h2 className="text-lg text-gray-500">Email: {user.email}</h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Your Orders
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-200 transform hover:scale-105"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
