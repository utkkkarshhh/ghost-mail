import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import MailCard from "../UI/Cards/MailCard";
import secrets from "../secrets";
import Loader from "../UI/Loaders/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.homepage}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.section1}>
          {secrets.map((secret) => (
            <MailCard
              key={secret.id}
              id={secret.id}
              message={secret.message}
              time={secret.receivedTime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
