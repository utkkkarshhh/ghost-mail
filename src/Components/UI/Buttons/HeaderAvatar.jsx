import React, { useState } from "react";
import styles from "./HeaderAvatar.module.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiHome7Fill } from "react-icons/ri";

const HeaderAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.headerAvatar} onClick={menuOpenHandler}>
      <div className={styles.avatar}>
        <FaUserCircle className={styles.avatarImage} />
      </div>
      <div className={styles.headerAvatarButton}>
        <button className={styles.navButton} name="navOption" id="navOption">
          Utkarsh
        </button>
        {isOpen && (
          <div className={styles.optionBox}>
            <Link to="/home">
              <p className={styles.option}>
                <RiHome7Fill /> Home
              </p>
            </Link>
            <Link to="/profile">
              <p className={styles.option}>
                <FaUserPlus /> Profile
              </p>
            </Link>
            <Link to="/settings">
              <p className={styles.option}>
                <IoIosSettings />
                Settings
              </p>
            </Link>
            <Link to="https://www.github.com/utkkkarshhh">
              <p className={styles.option}>
                <FaGithub /> Github
              </p>
            </Link>
            <Link to="/">
              <p className={styles.option}>
                <IoMdLogOut /> Logout
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderAvatar;
