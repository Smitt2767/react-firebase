import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import ProfileImg from "../ProfileImg/ProfileImg";

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const searchRef = useRef();

  return (
    <div className="pt-10  flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 flex-grow">
        <AiOutlineSearch className="text-2xl" />
        <input
          type="text"
          placeholder="Search"
          ref={searchRef}
          className="bg-transparent text-lg focus:outline-none"
        />
      </div>

      <p className="text-lg ">Hello, {currentUser.displayName}</p>
      <ProfileImg
        imgSrc={currentUser.photoURL}
        username={currentUser.displayName}
      />
    </div>
  );
};

export default Header;
