import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Reusables/Header";
import Footer from "./Components/Reusables/Footer";
import LandingPage from "./Components/Pages/LandingPage";
import Home from "./Components/Pages/Home";
import ProfilePage from "./Components/Pages/ProfilePage";
import LoginPage from "./Components/Pages/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage";
import SendMessage from "./Components/Pages/SendMessagePage";
import PrivateRoute from "./Components/Reusables/PrivateRoute";
import AuthContext from "./Components/store/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={!isLoggedIn ? <LandingPage /> : <Navigate to="/home" />}/>
          <Route
            exact
            path="/register"
            element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={
              <PrivateRoute
                Component={<Home />}
                protectCondition={isLoggedIn}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                Component={<ProfilePage />}
                protectCondition={isLoggedIn}
                redirectTo="/login"
              />
            }
          />
          <Route
            exact
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
          />

          <Route
            exact
            path="*"
            element={
              !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/home" />
            }
          />

          <Route exact path="/send/:username?" element={<SendMessage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
