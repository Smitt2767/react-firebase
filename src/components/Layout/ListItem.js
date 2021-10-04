import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import variants from "../../constants/variants";

const ListItem = ({ Logo, title, path, state }) => {
  return (
    <NavLink
      className={`cursor-pointer px-2 rounded-full `}
      to={path}
      exact
      activeClassName="bg-primary bg-opacity-20 rounded-full text-primary"
    >
      <motion.div
        variants={variants.listItem}
        className={`flex ${
          state && "justify-center w-12 h-12"
        } items-center py-2 px-2`}
        whileTap={{
          scale: 0.9,
        }}
      >
        <Logo className="text-2xl " />
        {!state && <p className="text-xl ml-4 ">{title}</p>}
      </motion.div>
    </NavLink>
  );
};

export default ListItem;
