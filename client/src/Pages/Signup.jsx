import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../Context/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = UserData();
  const navigate = useNavigate();

  const subHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password,navigate);
    navigate("/verify");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative p-10 space-y-5 bg-blue-50">
        <h1 className="text-xl font-semibold tracking-wide">
          Signup To Your Account
        </h1>
        <form onSubmit={subHandler} className="flex flex-col space-y-5">
          <input
            className="p-3 outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />

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
            Signin
          </button>
          <div className="flex space-x-2 justify-center tracking-wide">
            <p>Don't have an account?</p>
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
