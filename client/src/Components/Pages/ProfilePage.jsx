import React, { useState, useEffect, useContext, Fragment } from "react";
import styles from "./ProfilePage.module.css";
import Loader from "../UI/Loaders/Loader";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SuperButton from "../UI/Buttons/SuperButton";
import { Link } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.jpeg";
import Divider from "../Reusables/Divider";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import { jwtDecode } from "jwt-decode";
var Buffer = require("buffer/").Buffer;

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { onLogout } = useContext(AuthContext);

  // Form State
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (image) {
      const url = getImageUrl(image);
      setImageUrl(url);
    }
  }, [image]); 

  const getImageUrl = (imageData) => {
    if (!imageData) return null;

    if (imageData.type === "Buffer" && Array.isArray(imageData.data)) {
      const base64String = Buffer.from(imageData.data).toString("base64");
      return `data:image/jpeg;base64,${base64String}`;
    } else {
      console.error("Invalid image data format:", imageData);
      return null;
    }
  };

  const accountDeleteHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/deleteAccount`,
        {
          data: { username: "" },
        }
      );
      alert("We hate to see you go!");
      onLogout();
    } catch (error) {
      alert("Error deleting your account");
      console.error("Error deleting your account!", error);
    }
  };

  const profileOpener = () => {
    setIsProfileOpen(true);
    setIsSettingsOpen(false);
  };

  const settingsOpener = () => {
    setIsProfileOpen(false);
    setIsSettingsOpen(true);
  };

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
        console.log(userProfile);
        setName(userProfile.name);
        setDob(userProfile.birthday);
        setGender(userProfile.gender);
        if (userProfile.image) {
          setImage(userProfile.image);
        } else {
          setImage(Avatar);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = Buffer.from(reader.result);

      setImage(imageData);
      setImageBase64(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("Access token not found!");
        return;
      }
      const decodedData = jwtDecode(accessToken);
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/user/updateInformation`,
        {
          name,
          dob,
          gender,
          image: imageBase64,
        },
        { params: { decodedData } }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user information:", err);
    }
  };

  return (
    <Fragment>
      <div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.profilePage}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarItems}>
                <div
                  className={`${styles.sidebarItem} ${
                    isProfileOpen && styles.activeItem
                  }`}
                  onClick={profileOpener}
                >
                  <FaUser /> Profile
                </div>
                <div
                  className={`${styles.sidebarItem} ${
                    isSettingsOpen && styles.activeItem
                  }`}
                  onClick={settingsOpener}
                >
                  <IoSettingsSharp /> Settings
                </div>
              </div>
            </div>
            <div className={styles.mainPage}>
              {isProfileOpen && (
                <div className={styles.profileSection}>
                  <h1>
                    Your <span className={styles.profilePageSpan}>Profile</span>
                  </h1>
                  <form className={styles.profileForm} onSubmit={handleSubmit}>
                    <div className={styles.userCredentials}>
                      <div className={styles.profilePicture}>
                        {imageUrl && (
                          <img
                            className={styles.settingsPicture}
                            src={imageUrl}
                            alt="Avatar"
                          />
                        )}
                      </div>
                      <div className={styles.settingPictureButtons}>
                        <input
                          className={styles.enterImageInput}
                          type="file"
                          id="profile_picture"
                          name="profile_picture"
                          accept=".jpeg, .png, .jpg, .webp"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className={styles.userInformation}>
                      <h2 className={styles.userInformationHeading}>
                        <span className={styles.profilePageSpan}>
                          Edit/update{" "}
                        </span>
                        personal information
                      </h2>
                      <Divider text="Update/Edit" />
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="gender">Gender:</label>
                        <select
                          id="gender"
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <SuperButton
                        type="submit"
                        title="Submit"
                        className={styles.submitButton}
                      />
                    </div>
                  </form>
                </div>
              )}

              {isSettingsOpen && (
                <div className={styles.settingsSection}>
                  <h1>
                    Your{" "}
                    <span className={styles.profilePageSpan}>Settings</span>
                  </h1>
                  <div className={styles.deleteAccount}>
                    <h3 className={styles.deleteAccountHeading}>
                      Delete your
                      <span className={styles.deleteAccountSpan}>
                        {" "}
                        account!
                      </span>
                    </h3>
                    <p className={styles.deleteAccountText}>
                      This is a permanent action. You can come back anytime
                      you'd like.
                    </p>
                    <SuperButton
                      title="Delete Now"
                      onClick={accountDeleteHandler}
                    />
                  </div>
                  <div className={styles.contactDeveloper}>
                    <h3 className={styles.contactDeveloperHeading}>
                      Contact
                      <span className={styles.contactDeveloperSpan}>
                        {" "}
                        Developer
                      </span>
                    </h3>
                    <p className={styles.contactDeveloperText}>
                      Reach out to the developer for any query regarding this
                      app.
                    </p>
                    <Link to="mailto:utkarshbhardwajmail@gmail.com">
                      <SuperButton title="Click Here" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProfilePage;
