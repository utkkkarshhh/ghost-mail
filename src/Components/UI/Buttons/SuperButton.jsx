import React from "react";
import styles from "./SuperButton.module.css";

const SuperButton = (props) => {

  const buttonClass = props.disabled
    ? `${styles.spbtn} ${styles.disabled}`
    : styles.spbtn;

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <p className="text">{props.title}</p>
    </button>
  );
};

export default SuperButton;
