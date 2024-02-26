import React from "react";
import styles from "./HeroCard.module.css";
import SuperButton from "../Buttons/SuperButton";
import { BiSolidGhost } from "react-icons/bi";
import Divider from "../../Reusables/Divider";
import { Link } from "react-router-dom";

const HeroCard = () => {
  return (
    <div className={styles.heroCard}>
      <p className={styles.intro}>
        Welcome to{" "}
        <span className={styles.title}>
          Ghost<span className={styles.mailText}>Mail</span>
          <BiSolidGhost />
        </span>
      </p>
      <p className={styles.tagline}>Send, share, and connect, anonymously.</p>
      <Link to="/register"><SuperButton title="Register" /></Link>
      <Divider />
      <div className={styles.usernameInput}>
        <p>Send Message</p>
        <input
          className={styles.messageUsername}
          type="text"
          placeholder="Username"
        />
        <SuperButton title="Send" />
      </div>
    </div>
  );
};

export default HeroCard;