import React, { useState, useEffect, Fragment } from "react";
import styles from "./Home.module.css";
import Loader from "../UI/Loaders/Loader";
import MailItem from "../UI/Cards/MailItem";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSecretsOpen, setIsSecretsOpen] = useState(true);
  const [isChatroomOpen, setIsChatroomOpen] = useState(false);
  const [secrets, setSecrets] = useState([]);
  const [secretsLoading, setSecretsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const secretsOpener = () => {
    setIsSecretsOpen(true);
    setIsChatroomOpen(false);
  };

  const chatroomOpener = () => {
    setIsSecretsOpen(false);
    setIsChatroomOpen(true);
  };

  //   Secrets Functions
  const messageShareHandler = (id) => {
    alert(
      "Message with id: " +
        id +
        " selected. We will make sharing possible soon."
    );
  };

  const messageDeleteHandler = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/message/deleteMessage`,
        { data: { id } }
      );
      setSecrets(secrets.filter((secret) => secret.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found!");
          return;
        }
        const decodedData = jwtDecode(accessToken);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/message/getMessages`,
          {
            params: { decodedData },
          }
        );
        if (response.data.success) {
          setSecrets(response.data.message);
        } else {
          console.error("Error fetching secrets:", response.data.error);
        }
        setSecretsLoading(false);
      } catch (error) {
        console.error("Error fetching secrets:", error);
        setSecretsLoading(false);
      }
    };

    fetchData();
  }, [secrets]);

  return (
    <Fragment>
      <div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.homepage}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarItems}>
                <div
                  className={`${styles.sidebarItem} ${
                    isSecretsOpen && styles.activeItem
                  }`}
                  onClick={secretsOpener}
                >
                  <FaUser /> Secrets
                </div>
                <div
                  className={`${styles.sidebarItem} ${
                    isChatroomOpen && styles.activeItem
                  }`}
                  onClick={chatroomOpener}
                >
                  <IoSettingsSharp /> Chatroom
                </div>
              </div>
            </div>
            <div className={styles.mainPage}>
              {isSecretsOpen && (
                <div className={styles.secretsSection}>
                  <h1>
                    Your <span className={styles.homepageSpan}>Secrets</span>
                  </h1>
                  {secretsLoading ? (
                    <div className={styles.loaderContainer}>
                      <Loader />
                    </div>
                  ) : (
                    <div className={styles.section1}>
                      {secrets.length >= 1 ? (
                        secrets.map((secret) => (
                          <MailItem
                            key={secret.id}
                            id={secret.id}
                            message={secret.message}
                            time={secret.time_submitted}
                            onClick={() => messageDeleteHandler(secret._id)}
                            onShare={() => messageShareHandler(secret._id)}
                          />
                        ))
                      ) : (
                        <p className={styles.noSecretsText}>
                          No Secrets Available
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
              {isChatroomOpen && (
                <div className={styles.chatroomSection}>
                  <h1>
                    Your
                    <span className={styles.homepageSpan}> Chatroom</span>
                  </h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
