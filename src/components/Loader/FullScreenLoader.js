import React from "react";
import Modal from "../Modal/Modal";

const FullScreenLoader = ({ children }) => {
  return (
    <Modal>
      <div className="h-full w-full  flex items-center justify-center">
        {children}
      </div>
    </Modal>
  );
};

export default FullScreenLoader;
