import React, { useState, useEffect } from "react";
import styles from "./SettingsPage.module.css";
import Loader from "../UI/Loaders/Loader";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles.settingsPage}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <p>Settings Page</p>
      )}
    </div>
  );
};

export default SettingsPage;
