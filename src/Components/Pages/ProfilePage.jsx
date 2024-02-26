import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Loader from "../UI/Loaders/Loader";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SuperButton from "../UI/Buttons/SuperButton";
import { Link } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.jpeg";
import { MdUploadFile } from "react-icons/md";
import Divider from "../Reusables/Divider";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const profileOpener = () => {
    setIsProfileOpen(true);
    setIsSettingsOpen(false);
  };

  const settingsOpener = () => {
    setIsProfileOpen(false);
    setIsSettingsOpen(true);
  };

  return (
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
                <div className={styles.userCredentials}>
                  <div className={styles.profilePicture}>
                    <img
                      className={styles.settingsPicture}
                      src={Avatar}
                      alt="Avatar"
                    ></img>
                  </div>
                  <div className={styles.settingPictureButtons}>
                    <form method="POST">
                      <input
                        className={styles.enterImageInput}
                        type="file"
                        alt="insert_image"
                        id="profile_picture"
                        name="profile_picture"
                      ></input>
                      <button className={styles.imageInputButton} type="submit">
                        <MdUploadFile />
                      </button>
                    </form>
                  </div>
                </div>
                <div className={styles.userInformation}>
                  <h2 className={styles.userInformationHeading}>
                    <span className={styles.profilePageSpan}>Edit/update </span>
                    personal information
                  </h2>
                  <Divider text="Update/Edit" />
                </div>
              </div>
            )}
            {isSettingsOpen && (
              <div className={styles.settingsSection}>
                <h1>
                  Your <span className={styles.profilePageSpan}>Settings</span>
                </h1>
                <div className={styles.deleteAccount}>
                  <h3 className={styles.deleteAccountHeading}>
                    Delete your{" "}
                    <span className={styles.deleteAccountSpan}>account!</span>
                  </h3>
                  <p className={styles.deleteAccountText}>
                    This is a permanent action. You can come back anytime you'd
                    like.
                  </p>
                  <SuperButton title="Delete Now" />
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
                    Reach out to the developer for any query regarding this app.
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
  );
};

export default ProfilePage;
