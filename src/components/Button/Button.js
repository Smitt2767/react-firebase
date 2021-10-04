import React from "react";

const Button = ({ children, bgColor, ...rest }) => {
  return (
    <button
      className={`w-full py-1 rounded-md flex items-center justify-center bg-${bgColor}-500 hover:bg-${bgColor}-600 text-white font-bold ${
        rest.disabled ? "disabled:bg-gray-400" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
