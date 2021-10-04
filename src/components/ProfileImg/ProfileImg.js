import React from "react";

const ProfileImg = ({ imgSrc, username }) => {
  return (
    <div
      className={`w-12 h-12 text-white bg-blue-400 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 transform  block overflow-hidden`}
    >
      {!!imgSrc ? (
        <img
          src={imgSrc}
          className="object-cover h-full w-full"
          alt="profile"
        />
      ) : (
        <div className="font-bold text-2xl">{username[0].toUpperCase()}</div>
      )}
    </div>
  );
};

export default ProfileImg;
