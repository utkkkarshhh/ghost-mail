import React from "react";
import styles from "./Divider.module.css";

const Divider = (props) => {
  return (
    <div className={styles.divider}>
      <hr className={styles.line} />
      <span className={styles.text}>{props.text}</span>
      <hr className={styles.line} />
    </div>
  );
};

export default Divider;
