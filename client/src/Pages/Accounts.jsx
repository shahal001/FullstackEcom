import React from "react";

const Accounts = ({ user }) => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-gray-400 p-10 space-y-5 tracking-wide">
        <h1 className="text-white">Account : {user.name}</h1>
        <h2 className="text-white">Email: {user.email}</h2>
        <div className="flex gap-5">
          <button className=" text-white bg-blue-500 p-2 font-semibold tracking-wide rounded-sm   active:bg-blue-700 transform active:scale-95 transition duration-150 ">
            Your Order
          </button>
          <br/>
          { user.role == "admin" && (
            <button className="text-white bg-green-500 p-2 font-semibold tracking-wide rounded-sm   active:bg-green-700 transform active:scale-95 transition duration-150 ">
            Dashbord
          </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Accounts;
