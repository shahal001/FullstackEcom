import React from "react";
import { Link } from "react-router-dom";

const login = () => {
  return (
    <div className="flex flex-col justify-center  items-center h-screen">
      <div className="relative p-10 space-y-5 bg-blue-50">
        <h1 className="text-xl font-semibold tracking-wide">
          Signin To Your Account
        </h1>
        <form className="flex flex-col space-y-5">
          <input className="p-3 outline-none" type="email" placeholder="email" required />
          <input
            className="p-3 outline-none"
            type="password"
            placeholder="password"
            required
          />
          <button className="bg-blue-500 p-3 text-white tracking-wide font-semibold active:bg-blue-700 transform active:scale-95 transition duration-150">
            <Link to="/verify" className="px-12">Signin</Link>
          </button>
          <div className="flex space-x-2 justify-center tracking-wide">
            <p>Don't have account ?</p>
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
