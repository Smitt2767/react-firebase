import React from "react";

const TextAreaInput = ({
  label,
  error,
  type = "text",
  changeToType,
  IconA,
  IconB,
  ...rest
}) => {
  return (
    <div className="flex flex-col text-md">
      <label className={`text-xs font-bold mb-1 ${!!error && "text-red-400"}`}>
        {label}
      </label>
      <div
        className={`flex items-center gap-1 border-2 ${
          !error ? "border-gray-200" : "border-red-400"
        } rounded-md px-2 py-1`}
      >
        <textarea className="flex-grow focus:outline-none text-sm" {...rest} />
      </div>

      {error && <span className="text-red-400 text-xs font-bold">{error}</span>}
    </div>
  );
};

export default TextAreaInput;
