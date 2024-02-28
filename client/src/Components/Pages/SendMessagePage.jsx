import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SendMessagePage.module.css";
import SuperButton from "../UI/Buttons/SuperButton";
import axios from "axios";

const SendMessagePage = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { username } = useParams();
  const URL = "https://localhost:8008";

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/sendMessage`, { message, username });
      setMessage("");
      setErrorMessage("Message sent successfully");
      console.log("Message sent successfully");
    } catch (error) {
      console.log("Error sending message:", error);
      setErrorMessage("Error sending message. Please try again.");
    }
  };

  return (
    <div className={styles.sendMessageCard}>
      <div className={styles.upperSection}>
        <h1 className={styles.homepageSendMessageHeading}>
          Enter your
          <span className={styles.homepageSendMessageSpan}> message.</span>
        </h1>
        <p className={styles.homepageSendMessageParagraph}>
          Don't worry, you are always behind a curtain!
        </p>
      </div>
      <div className={styles.lowerSection}>
        <form
          className={styles.messageForm}
          method="POST"
          onSubmit={handleMessageSubmit}
        >
          <textarea
            className={styles.landingPageMessageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
          <SuperButton
            type="submit"
            className={styles.sendButton}
            title="Send"
          />
        </form>
        {errorMessage && (
          <p className={styles.messagePageError}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SendMessagePage;
