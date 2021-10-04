import React from "react";
import classes from "./Circle.module.css";

const Circle = () => {
  return (
    <div className={classes["sk-chase"]}>
      <div className={classes["sk-chase-dot"]}></div>
      <div className={classes["sk-chase-dot"]}></div>
      <div className={classes["sk-chase-dot"]}></div>
      <div className={classes["sk-chase-dot"]}></div>
      <div className={classes["sk-chase-dot"]}></div>
      <div className={classes["sk-chase-dot"]}></div>
    </div>
  );
};

export default Circle;
