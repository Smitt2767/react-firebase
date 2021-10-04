import React from "react";
import { Link } from "react-router-dom";

const _404 = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col">
        <h1>404 Page Not Found</h1>
        <Link to="/">Go back to home</Link>
      </div>
    </div>
  );
};

export default _404;
