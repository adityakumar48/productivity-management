import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeatureSection from "./FeatureSection";

const LandingPage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeatureSection />
    </main>
  );
};

export default LandingPage;
