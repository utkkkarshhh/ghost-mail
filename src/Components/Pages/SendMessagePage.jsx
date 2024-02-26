import React from "react";
import styles from "./SendMessagePage.module.css";
import SuperButton from "../UI/Buttons/SuperButton";

const SendMessagePage = () => {
  return (
    <div className={styles.sendMessageCard}>
      <div className={styles.upperSection}>
        <h1 className={styles.homepageSendMessageHeading}>
          Please enter a
          <span className={styles.homepageSendMessageSpan}> message.</span>
        </h1>
        <p className={styles.homepageSendMessageParagraph}>
          Don't worry, you are always behind a curtain!
        </p>
      </div>
      <div className={styles.lowerSection}>
        <input
          className={styles.landingPageMessageInput}
          type="text"
          placeholder="Enter your message."
        ></input>
        <SuperButton title="Send Message" />
      </div>
    </div>
  );
};

export default SendMessagePage;
