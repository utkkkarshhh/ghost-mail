import React from "react";
import styles from "./HomePage.module.css";
import MailCard from "../UI/Cards/MailCard";
import secrets from "../secrets";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
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
    </div>
  );
};

export default HomePage;
