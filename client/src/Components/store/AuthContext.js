import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Components/data/baseUrl";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken") ? true : false
  );

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (username, password) => {
    try {
      await axios
        .post(`${baseUrl}/login`, { username, password })
        .then((response) => {
          if (response.status === 200 && response.data.accessToken) {
            setIsLoggedIn(true);
            localStorage.setItem("accessToken", response.data.accessToken);
            window.location.href = "/home";
            console.log("Value of isLoggedIn: " + isLoggedIn);
          }
        });
    } catch (error) {
      console.log("Error logging in! ", error);
    }
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
