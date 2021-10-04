import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";

const SigninSignupWithGoogleButton = ({ title, onClick }) => {
  return (
    <button
      className="border-2 border-gray-200 p-2 rounded-md flex items-center justify-center gap-2 text-gray-400 hover:text-gray-700 focus:outline-none"
      onClick={onClick}
    >
      <span>
        <AiOutlineGoogle />
      </span>
      <span className="text-sm font-bold">{title}</span>
    </button>
  );
};

export default SigninSignupWithGoogleButton;
