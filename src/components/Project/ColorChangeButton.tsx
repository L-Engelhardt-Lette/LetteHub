import React from "react";
import { FaPaintbrush } from "react-icons/fa6";

const ColorChangeButton = () => {
  return (
    <button className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
      <FaPaintbrush className="w-5 h-5" />
      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
        Color Change
      </span>
    </button>
  );
};

export default ColorChangeButton;
