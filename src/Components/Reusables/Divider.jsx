import React from "react";
import styles from "./Divider.module.css";

const Divider = () => {
  return (
    <div className={styles.divider}>
      <hr className={styles.line} />
      <span className={styles.text}>or</span>
      <hr className={styles.line} />
    </div>
  );
};

export default Divider;
