import React, { useState, useContext, useEffect } from "react";
import styles from "./HeaderAvatar.module.css";
import { Link } from "react-router-dom";
import UserImage from "../../../assets/images/Avatar.jpeg";
import { FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiHome7Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import AuthContext from "../../store/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
var Buffer = require("buffer/").Buffer;

const HeaderAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const { onLogout } = useContext(AuthContext);
  const menuOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Call getImageUrl function to get the image URL
    if (image) {
      const url = getImageUrl(image);
      setImage(url);
    }
  }, [image]); // Add image to the dependencies array

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decodedData = jwtDecode(accessToken);
    setUsername(decodedData.username);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found!");
          return;
        }
        const decodedData = jwtDecode(accessToken);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/userInformation`,
          { params: { decodedData } }
        );
        const userProfile = response.data.user;
        console.log(response.data.user);
        setName(userProfile.name);
        setUsername(userProfile.username);
        setImage(userProfile.image);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const logoutHandler = () => {
    onLogout();
    setIsOpen(false);
  };

  const getImageUrl = (imageData) => {
    if (!imageData) return null;
  
    try {
      if (typeof imageData === 'string') {
        return imageData;
      }

      if (imageData.type === "Buffer" && Array.isArray(imageData.data)) {
        const base64String = Buffer.from(imageData.data).toString("base64");
        return `data:image/jpeg;base64,${base64String}`;
      } else {
        console.error("Invalid image data format:", imageData);
        return null;
      }
    } catch (error) {
      console.error("Error converting image data:", error);
      return null;
    }
  };

  return (
    <div className={styles.headerAvatar} onClick={menuOpenHandler}>
      <div className={styles.avatar}>
        <img src={image} alt="Avatar"></img>
      </div>
      <div className={styles.headerAvatarButton}>
        <div className={styles.avatarButton}>
          <div>
            <button
              className={styles.navButton}
              name="navOption"
              id="navOption"
            >
              {name ? name.split(" ")[0] : username && "@" + username}
            </button>
          </div>
          <div className={styles.avatarArrowButton}>
            <MdKeyboardArrowDown />
          </div>
        </div>

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
