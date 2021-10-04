import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import variants from "../../constants/variants";

const ListItem = ({ Logo, title, path }) => {
  return (
    <NavLink
      className={` cursor-pointer px-6 hover:text-gray-900 focus:outline-none`}
      to={path}
      exact
      activeClassName="border-r-4 border-green-500"
    >
      <motion.div
        variants={variants.listItem}
        className="flex items-center rounded-lg hover:bg-gray-50 py-2 px-2"
      >
        <Logo className="text-2xl" />
        <p className="text-xl ml-4 ">{title}</p>
      </motion.div>
    </NavLink>
  );
};

export default ListItem;
