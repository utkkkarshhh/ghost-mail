import React from "react";
import HeroCard from "../UI/Cards/HeroCard";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <HeroCard />
    </div>
  );
};

export default LandingPage;
