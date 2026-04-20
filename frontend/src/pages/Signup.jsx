import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = "https://passvault-9eg9.onrender.com";
  // console.log(API_URL)
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.message === "User created successfully") {
        alert("Signup successful. Please login.");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      
      {/* Card */}
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4">
        
        <h2 className="text-2xl font-bold text-center">Signup</h2>

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
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:font-bold">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Signup;