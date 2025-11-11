import React from "react";
import Hero from "./Sections/Hero";
import ShowcaseSaection from "./Sections/ShowcaseSaection";
import Navbar from "./Components/Navbar";
import LogoSection from "./Sections/LogoSection";
import FeatureCards from "./Sections/FeatureCards";
import ExperienceSection from "./Sections/ExperienceSection";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShowcaseSaection />
      <LogoSection/>
      <FeatureCards/>
      <ExperienceSection/>
    </>
  );
};

export default App;
