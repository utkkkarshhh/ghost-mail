import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Reusables/Header";
import Footer from "./Components/Reusables/Footer";
import LandingPage from "./Components/Pages/LandingPage";
import HomePage from "./Components/Pages/HomePage";
import ProfilePage from "./Components/Pages/ProfilePage";
import LoginPage from "./Components/Pages/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage";
import SendMessage from "./Components/Pages/SendMessagePage";
import SettingsPage from "./Components/Pages/SettingsPage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/send/:username" element={<SendMessage />} />

          <Route exact path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
