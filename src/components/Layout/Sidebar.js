import React from "react";
import {
  AiOutlineHome,
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineProfile,
  AiOutlineLogout,
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
  return (
    <div className="w-80 h-full bg-white text-gray-700 flex flex-col py-10 gap-4">
      <Link
        className="px-8 text-4xl font-bold flex-none focus:outline-none"
        to="/"
      >
        Dashboard
      </Link>
      <motion.div
        variants={variants.list}
        initial="init"
        animate="load"
        className="flex-grow flex flex-col gap-4 py-10"
      >
        {routes.map((route) => (
          <ListItem key={route.id} {...route} />
        ))}
      </motion.div>
      <div className="flex-none flex flex-col pb-4 px-8">
        <button
          className="flex items-center cursor-pointer hover:text-gray-900 focus:outline-none"
          onClick={() => {
            dispatch(setIsLoading(true));
            signOut();
          }}
        >
          <AiOutlineLogout className="text-2xl" />
          <h2 className="text-xl font-bold ml-4 ">Logout</h2>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
