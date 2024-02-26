import React from "react";
import styles from "./LoginCard.module.css";
import SuperButton from "../Buttons/SuperButton";

const LoginCard = () => {
  const loginHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginCardHeader}>
        <h1>
          Login <span className={styles.nowText}>Now!</span>
        </h1>
        <p>Share and connect anonymously</p>
      </div>

      <form className={styles.loginForm} onSubmit={loginHandler}>
        <label htmlFor="username">Username</label>
        <input
          className={styles.formInput}
          id="username"
          name="username"
          placeholder="Enter Username"
          type="text"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className={styles.formInput}
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          required
        />

        <SuperButton title="Login now" />
      </form>
      <p className={styles.forgetMessage}>
        Forgot password? <a href="mailto:utkarshbhardwajmail@gmail.com">Get in touch!</a>
      </p>
    </div>
  );
};

export default LoginCard;
