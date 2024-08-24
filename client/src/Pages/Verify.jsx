import React, { useState } from "react";
import { UserData } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp,setOtp] = useState()

  const { verifyUser } = UserData();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyUser(Number(otp),navigate)
  }
 
  return (
    <div className="flex  justify-center items-center h-screen ">
      <div
        className="flex flex-col space-y-3 p-7 bg-blue-100 rounded-md
        "
      >
        <h1 className="text-center text-xl font-semibold tracking-wide ">
          Verify Account
        </h1>
        <form onSubmit={handleSubmit} >
        <input
          className="p-2 outline-none "
          type="number"
          required
          placeholder="Enter Otp"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />
        <button className="bg-blue-500 p-2  text-white tracking-wide font-semibold active:bg-blue-700 transform active:scale-95 transition duration-150">
          Signin
        </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
