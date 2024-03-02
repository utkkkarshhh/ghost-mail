import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = "http://localhost:8008";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus && storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (username, password) => {
    try {
      await axios.post(`${URL}/login`, { username, password });
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "/home";
      console.log("Value of isLoggedIn: " + isLoggedIn);
    } catch (error) {
      console.log("Error logging in! ", error);
    }
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
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
