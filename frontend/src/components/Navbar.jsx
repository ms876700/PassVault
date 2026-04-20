import React from "react";
import { GrGithub } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token"); // 🔥 remove token
    navigate("/login"); // redirect
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mycontainer flex justify-between px-5 h-14 items-center">
        
        {/* Logo */}
        <div className="logo font-bold text-2xl">
          <span className="text-fuchsia-500">&lt;</span>
          Pass
          <span className="text-fuchsia-500">OP/&gt;</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Github Button */}
          <button className="flex gap-2 items-center bg-fuchsia-500 rounded-full p-1 ring">
            <GrGithub className="text-3xl" />
            <span className="font-bold text-lg">Github</span>
          </button>

          {/* Logout Button (only if logged in) */}
          {token && (
            <button
              onClick={handleLogout}
              className=" px-4 py-1 rounded-full font-semibold"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
