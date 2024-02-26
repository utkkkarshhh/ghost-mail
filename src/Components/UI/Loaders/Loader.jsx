import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div class={styles.dotSpinner}>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
        <div class={styles.dotSpinner__dot}></div>
      </div>
    </div>
  );
};

export default Loader;
