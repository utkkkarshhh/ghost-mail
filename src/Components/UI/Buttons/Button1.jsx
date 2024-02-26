import React from "react";
import styles from "./Button1.module.css";

const Button1 = (props) => {
  return (
    <button className={styles.button1} onClick={props.onClick}>
      <span className={styles.vector}>{props.vector}</span>
      <p className={styles.text}>{props.title}</p>
    </button>
  );
};

export default Button1;
