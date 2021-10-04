import React from "react";
import { createPortal } from "react-dom";

const parentEl = document.querySelector("#overlays");

const Modal = ({ children, setShowModal }) => {
  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-20 w-full h-full items-center justify-center flex close "
          onClick={(e) => {
            if (e.target.classList.contains("close")) setShowModal(false);
          }}
        >
          {children}
        </div>,
        parentEl
      )}
      {createPortal(
        <div className="fixed inset-0 z-10 bg-black bg-opacity-40"></div>,
        parentEl
      )}
    </>
  );
};

export default Modal;
