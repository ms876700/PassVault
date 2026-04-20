import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-900 text-white  w-full">
        <div className="logo font-bold text-xl">
          <span className="text-fuchsia-500">&lt;</span>
          Pass
          <span className="text-fuchsia-500">OP/&gt;</span>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          Created with
          <FaHeart className="text-red-700"/> by Mamta
        </div>
      </div>
    </>
  );
};

export default Footer;
