import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import SuperButton from "../Buttons/SuperButton";
import axios from "axios";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const URL = "http://localhost:8008";

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/login`, { username, password });
      setUsername("");
      setPassword("");
      setErrorMessage("Login Successful");
    } catch (error) {
      console.log("Error logging in! ", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginCardHeader}>
        <h1>
          Login <span className={styles.nowText}>Now!</span>
        </h1>
        <p>Share and connect anonymously</p>
      </div>

      <form className={styles.loginForm} onSubmit={loginHandler} method="POST">
        <label htmlFor="username">Username</label>
        <input
          className={styles.formInput}
          id="username"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className={styles.formInput}
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Enter Password"
          type="password"
          required
        />

        <SuperButton title="Login now" type="submit" />
      </form>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <p className={styles.forgetMessage}>
        Forgot password?{" "}
        <a href="mailto:utkarshbhardwajmail@gmail.com">Get in touch!</a>
      </p>
    </div>
  );
};

export default LoginCard;
