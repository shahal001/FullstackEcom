import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../Context/UserContext"; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = UserData();
 const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await userLogin(email, password,navigate);
   
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative p-10 space-y-5 bg-blue-50">
        <h1 className="text-xl font-semibold tracking-wide">
          Login To Your Account
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col space-y-5">
          <input
            className="p-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="p-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 p-3 text-white tracking-wide font-semibold active:bg-blue-700 transform active:scale-95 transition duration-150"
          >
            Sign in
          </button>
          <div className="flex space-x-2 justify-center tracking-wide">
            <p>Don't have an account?</p>
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
