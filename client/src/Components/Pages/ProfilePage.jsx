import React, { useState, useEffect, useContext, Fragment } from "react";
import styles from "./ProfilePage.module.css";
import Loader from "../UI/Loaders/Loader";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SuperButton from "../UI/Buttons/SuperButton";
import { Link } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.jpeg";
import { MdUploadFile } from "react-icons/md";
import Divider from "../Reusables/Divider";
import { baseUrl } from "../data/baseUrl";
import axios from "axios";
import AuthContext from "../store/AuthContext";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { onLogout } = useContext(AuthContext);

  //Form State
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const accountDeleteHandler = (event) => {
    console.log(event);
    try {
      axios.delete(`${baseUrl}/deleteAccount`, { data: { username: "" } });
      alert("We hate to see you go!");
      onLogout();
    } catch (error) {
      alert("Error deleting your account");
      console.log("Error deleting your account!", error);
    }
  };

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

  const handleSubmit = () => {
    console.log(name, dob, gender);
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
                        <button
                          className={styles.imageInputButton}
                          type="submit"
                        >
                          <MdUploadFile />
                        </button>
                      </form>
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
                    <form
                      className={styles.profileForm}
                      onSubmit={handleSubmit}
                    >
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
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <SuperButton
                        type="submit"
                        title="Submit"
                        className={styles.submitButton}
                      />
                    </form>
                  </div>
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
