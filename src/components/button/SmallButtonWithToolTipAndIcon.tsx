import React from "react";
import { IconType } from "react-icons";

interface CustomButtonProps {
  Icon: IconType;
  text: string;
}

const ToolTipIconButton: React.FC<CustomButtonProps> = ({ Icon, text }) => {
  return (
    <section className="flex justify-center items-center">
      <a
        href="/"
        className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
      >
        <Icon className="w-5 h-5" />
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
          {text}
        </span>
      </a>
    </section>
  );
};

export default ToolTipIconButton;
