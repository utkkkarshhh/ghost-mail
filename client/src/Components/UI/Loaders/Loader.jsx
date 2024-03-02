import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div className={styles.dotSpinner}>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
      </div>
    </div>
  );
};

export default Loader;
