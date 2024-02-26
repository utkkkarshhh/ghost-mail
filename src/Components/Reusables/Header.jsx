import React from "react";
import styles from "./Header.module.css";
import Button1 from "../UI/Buttons/Button1";
import { Link } from "react-router-dom";
import { BiSolidGhost } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

const isLoggedIn = true;

const Header = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          Ghost<span className={styles.mailText}>Mail</span>
          <BiSolidGhost />
        </div>
      </Link>

      {!isLoggedIn && (
        <div className={styles.buttons}>
          <Link to="/login">
            <Button1 vector={<RiLoginCircleFill />} title="Login" />
          </Link>
          <Link to="/register">
            <Button1 vector={<FaUserPlus />} title="Sign up" />
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className={styles.buttons}>
          <Button1 vector={<RiLoginCircleFill />} title="Logout" />
          <Button1 vector={<FaUserPlus />} title="Profile" />
        </div>
      )}
    </div>
  );
};

export default Header;