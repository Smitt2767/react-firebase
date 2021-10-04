import React, { useState } from "react";

const TextInput = ({
  label,
  error,
  type = "text",
  changeToType,
  IconA,
  IconB,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);

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
        <input
          type={inputType}
          className="flex-grow focus:outline-none text-sm"
          {...rest}
        />
        <button
          className="cursor-pointer text-gray-400"
          type="button"
          onClick={() => {
            setInputType((prevType) =>
              prevType !== changeToType ? changeToType : type
            );
          }}
        >
          {type === inputType ? IconA : IconB}
        </button>
      </div>

      {error && <span className="text-red-400 text-xs font-bold">{error}</span>}
    </div>
  );
};

export default TextInput;
