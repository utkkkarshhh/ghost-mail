import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./SendMessagePage.module.css";
import SuperButton from "../UI/Buttons/SuperButton";
import { FiAtSign } from "react-icons/fi";
import { validateMessageForm } from "../store/MessageFormValidation";
import axios from "axios";
import { baseUrl } from "../data/baseUrl";

const SendMessagePage = () => {
  const { username: usernameParam } = useParams("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState(usernameParam || usernameInput);
  const [formDisabled, setFormDisabled] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    setUsernameInput(event.target.value);
    setUsername(event.target.value);
  };

  useEffect(() => {
    setFormDisabled(validateMessageForm(username, message));
    setFormError(validateMessageForm(username, message));
  }, [username, message]);

  useEffect(() => {
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [usernameParam]);

  useEffect(() => {
    navigate(`/send/${username}`);
  }, [navigate, username]);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}/message/sendMessage`, {
        message,
        username,
      });
      setErrorMessage("Message sent successfully to @" + username);
      console.log("Message sent successfully");
      setMessage("");
      setUsernameInput("");
      setUsername("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("@" + username + " is not a valid username.");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage(
          "Your message contains profanity. Please use appropriate language."
        );
      } else {
        console.log("Error sending message:", error);
        setErrorMessage("Error sending message. Please try again.");
      }
    }
  };

  const renderForm = (
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
          <div className={styles.landingPageMessageUsername}>
            <span className={styles.atIcon}>
              <FiAtSign />
            </span>
            <input
              className={styles.landingPageMessageUsernameField}
              placeholder="Enter Username"
              value={usernameInput || username}
              onChange={usernameChangeHandler}
            ></input>
          </div>

          <textarea
            className={styles.landingPageMessageInput}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Enter your message..."
          />
          {formError && (
            <p className={styles.messagePageFormError}>{formError}</p>
          )}
          <SuperButton
            type="submit"
            className={styles.sendButton}
            title="Send"
            disabled={formDisabled}
          />
        </form>
        {errorMessage && (
          <p className={styles.messagePageError}>{errorMessage}</p>
        )}
      </div>
    </div>
  );

  return renderForm;
};

export default SendMessagePage;
