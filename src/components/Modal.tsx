import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ closeModal, children }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 bg-dark-light/75 w-screen h-full z-50 cursor-pointer"
        onClick={closeModal}
      ></div>
      <div className="absolute top-0 left-0 w-screen h-full flex items-center justify-center">
        <div className="relative flex items-center justify-center bg-light-light dark:bg-light-dark p-6 rounded-lg max-w-screen-sm w-5/6 z-50 overflow-y-scroll max-tablet:h-75v">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={closeModal}
          >
            <IoIosCloseCircle size={25} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
