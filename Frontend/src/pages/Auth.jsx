import React, { useState } from "react";
import api from "../axios/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const Auth = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      api.post("/auth/login", formData).then((response) => {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      });
    } else {
      api.post("/auth/register", formData).then((response) => {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] px-4">
      <div className="w-full max-w-md bg-[#2A2A2A] rounded-2xl shadow-lg overflow-hidden">
        {/* Header Tabs */}
        <div className="flex">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-4 text-center font-medium text-sm tracking-wide transition-all 
              ${
                isLogin
                  ? "bg-orange-500 text-white"
                  : "bg-[#1A1A1A] text-gray-400 hover:text-gray-200"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-4 text-center font-medium text-sm tracking-wide transition-all 
              ${
                !isLogin
                  ? "bg-orange-500 text-white"
                  : "bg-[#1A1A1A] text-gray-400 hover:text-gray-200"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Section */}
        <div className="p-6">
          {isLogin ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 placeholder-gray-500 outline-none border border-[#333] focus:border-orange-500 transition"
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 placeholder-gray-500 outline-none border border-[#333] focus:border-orange-500 transition"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md hover:shadow-orange-500/30 transition"
              >
                Login
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Don't have an account?{" "}
                <span
                  className="text-orange-400 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 placeholder-gray-500 outline-none border border-[#333] focus:border-orange-500 transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 placeholder-gray-500 outline-none border border-[#333] focus:border-orange-500 transition"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] text-gray-200 placeholder-gray-500 outline-none border border-[#333] focus:border-orange-500 transition"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md hover:shadow-orange-500/30 transition"
              >
                Sign Up
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Already have an account?{" "}
                <span
                  className="text-orange-400 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
