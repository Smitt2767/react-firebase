import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineProfile,
  AiOutlineLogout,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../services/authService";
import { setIsLoading } from "../../store/layoutSlice";
import ListItem from "./ListItem";
import { motion } from "framer-motion";
import variants from "../../constants/variants";

const routes = [
  { id: 1, path: "/", Logo: AiOutlineHome, title: "Home" },
  { id: 2, path: "/projects", Logo: AiOutlineFolderOpen, title: "Projects" },
  { id: 3, path: "/profile", Logo: AiOutlineProfile, title: "Profile" },
  { id: 4, path: "/settings", Logo: AiOutlineSetting, title: "Settings" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  return (
    <motion.div
      layout
      className={`${
        !state ? "w-80" : "w-auto"
      } h-full bg-white text-gray-700 flex flex-col py-10 gap-4`}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.3,
      }}
    >
      <div
        className={`flex items-center px-8 w-full ${
          !state ? "justify-between" : "justify-center"
        }`}
      >
        {!state && (
          <Link
            className="text-3xl font-bold flex-none focus:outline-none flex items-center gap-2"
            to="/"
          >
            <span>Dashboard</span>
          </Link>
        )}
        <motion.button
          className="text-xl bg-primary bg-opacity-20 hover:bg-opacity-30 focus:outline-none rounded-full p-2 text-primary"
          onClick={() => setState((prevState) => !prevState)}
          animate={{
            rotateY: state ? 180 : 0,
          }}
        >
          <AiOutlineArrowLeft />
        </motion.button>
      </div>
      <motion.div
        variants={variants.list}
        initial="init"
        animate="load"
        className="flex-grow flex flex-col gap-4 py-10 px-6"
      >
        {routes.map((route) => (
          <ListItem key={route.id} {...route} state={state} />
        ))}
      </motion.div>
      <div className="flex-none flex flex-col pb-4 px-8">
        <button
          className={`flex items-center cursor-pointer hover:text-gray-900 focus:outline-none ${
            state &&
            "bg-red-400 justify-center h-12 w-12 rounded-full text-white"
          }`}
          onClick={() => {
            dispatch(setIsLoading(true));
            signOut();
          }}
        >
          <AiOutlineLogout className="text-2xl" />
          {!state && <h2 className="text-xl font-bold ml-4 ">Logout</h2>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
