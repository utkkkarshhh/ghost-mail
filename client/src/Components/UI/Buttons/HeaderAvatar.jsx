import React, { useState, useContext, useEffect } from "react";
import styles from "./HeaderAvatar.module.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiHome7Fill } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import AuthContext from "../../store/AuthContext";
import { jwtDecode } from "jwt-decode";

const HeaderAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { onLogout } = useContext(AuthContext);
  const menuOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decodedData = jwtDecode(accessToken);
    setUsername(decodedData.username);
  }, []);

  const logoutHandler = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className={styles.headerAvatar} onClick={menuOpenHandler}>
      <div className={styles.avatar}>
        <FaUserCircle className={styles.avatarImage} />
      </div>
      <div className={styles.headerAvatarButton}>
        <button className={styles.navButton} name="navOption" id="navOption">
          {username && "@" + username}
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
            <Link to="/send">
              <p className={styles.option}>
                <LuSend /> Send Message
              </p>
            </Link>
            <Link to="/">
              <p className={styles.option} onClick={logoutHandler}>
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
