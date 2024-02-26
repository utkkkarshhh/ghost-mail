import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Loader from "../UI/Loaders/Loader";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.profilePage}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <p>Profile Page</p>
      )}
    </div>
  );
};

export default ProfilePage;
