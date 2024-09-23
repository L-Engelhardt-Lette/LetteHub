import React from "react";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="group flex justify-center transition-all rounded-full bg-gray-200 p-1">
        {/* Display the icon or any other content passed as children */}
        {children}

        {/* Tooltip text */}
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm bg-gray-700 text-white px-2 py-1 rounded">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
