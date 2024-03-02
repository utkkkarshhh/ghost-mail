import React, { useState, useContext } from "react";
import styles from "./LoginCard.module.css";
import SuperButton from "../Buttons/SuperButton";
import AuthContext from "../../store/AuthContext";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      authCtx.onLogin(username, password);
      if (authCtx.isLoggedIn) {
        setPassword("");
        setErrorMessage("Login Successful");
      } else {
        setErrorMessage("Login Failed");
      }
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
