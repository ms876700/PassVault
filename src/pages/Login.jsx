import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        window.location.href = "/"; // redirect to main page
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
  <div className="flex items-center justify-center h-screen">
    
    {/* Card */}
    <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4">
      
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      />

      {/* Password Field */}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-blue-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
      >
        Login
      </button>

      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 font-medium hover:font-bold">
          Signup
        </a>
      </p>

    </div>
  </div>
);
};

export default Login;
