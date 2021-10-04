import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="flex-grow px-8 flex flex-col">
        <Header />
        <div className="h-full py-4 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
