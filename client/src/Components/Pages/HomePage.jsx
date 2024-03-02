import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import MailCard from "../UI/Cards/MailCard";
import Loader from "../UI/Loaders/Loader";
import axios from "axios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [secrets, setSecrets] = useState([]);

  const URL = "http://localhost:8008";

  const messageShareHandler = (id) => {
    alert(
      "Message with id: " +
        id +
        " selected. We will make sharing possible soon."
    );
  };

  const messageDeleteHandler = async (id) => {
    try {
      await axios.delete(`${URL}/deleteMessage`, { data: { id } });
      setSecrets(secrets.filter((secret) => secret.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/getMessages`);
        if (response.data.success) {
          setSecrets(response.data.message);
        } else {
          console.error("Error fetching secrets:", response.data.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching secrets:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {secrets &&
            secrets.map((secret) => (
              <MailCard
                key={secret.id}
                id={secret.id}
                message={secret.message}
                time={secret.time}
                onClick={messageDeleteHandler}
                onShare={messageShareHandler}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
