import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterCard.module.css";
import SuperButton from "../Buttons/SuperButton";

const RegisterCard = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState("");

  const emailHandler = (event) => {
    event.preventDefault();
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const usernameHandler = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const passwordValidator = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordValidity("Password must be at least 8 characters long");
    } else {
      setPasswordValidity("");
    }
  };

  const confirmPasswordHandler = (event) => {
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);

    if (newPassword !== password) {
      setPasswordValidity("Passwords do not match");
    } else {
      setPasswordValidity("");
    }
  };

  const registerHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.registerCard}>
      <div className={styles.registerCardHeader}>
        <h1>
          Register <span className={styles.nowText}>Now!</span>
        </h1>
        <p>Don't worry! Your information is safe with us.</p>
      </div>

      <form className={styles.registerForm} onSubmit={registerHandler}>
        <label htmlFor="username">Email Address</label>
        <input
          className={styles.formInput}
          id="email"
          name="email"
          onChange={emailHandler}
          placeholder="Enter Email Address"
          type="email"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          className={styles.formInput}
          id="username"
          name="username"
          onChange={usernameHandler}
          placeholder="Enter Username"
          type="text"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className={styles.formInput}
          id="confirmPassword"
          name="confirmPassword"
          onChange={passwordValidator}
          placeholder="Enter Password"
          type="password"
          required
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          className={styles.formInput}
          id="password"
          name="password"
          onChange={confirmPasswordHandler}
          placeholder="Confirm Password"
          type="password"
          required
        />

        {passwordValidity && <p className={styles.error}>{passwordValidity}</p>}

        <SuperButton
          title="Sign up"
          disabled={
            email === "" ||
            username === "" ||
            passwordValidity !== "" ||
            password === "" ||
            confirmPassword === ""
          }
        />
      </form>

      <div className={styles.forgetMessage}>
        <p>Already have an account? <Link to="/login">Click here!</Link></p>
      </div>
    </div>
  );
};

export default RegisterCard;
