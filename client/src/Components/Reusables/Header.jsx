import React, { useContext } from "react";
import styles from "./Header.module.css";
import Button1 from "../UI/Buttons/Button1";
import HeaderAvatar from "../UI/Buttons/HeaderAvatar";
import { Link } from "react-router-dom";
import { BiSolidGhost } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import AuthContext from "../store/AuthContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      {!authCtx.isLoggedIn ? (
        <Link to="/">
          <div className={styles.logo}>
            Ghost<span className={styles.mailText}>Mail</span>
            <BiSolidGhost />
          </div>
        </Link>
      ) : (
        <Link to="/home">
          <div className={styles.logo}>
            Ghost<span className={styles.mailText}>Mail</span>
            <BiSolidGhost />
          </div>
        </Link>
      )}

      {!authCtx.isLoggedIn && (
        <div className={styles.buttons}>
          <Link to="/login">
            <Button1 vector={<RiLoginCircleFill />} title="Login" />
          </Link>
          <Link to="/register">
            <Button1 vector={<FaUserPlus />} title="Sign up" />
          </Link>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={styles.buttons}>
          <HeaderAvatar />
        </div>
      )}
    </div>
  );
};

export default Header;
