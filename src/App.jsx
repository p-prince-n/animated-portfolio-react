
import Hero from "./Sections/Hero";
import ShowcaseSaection from "./Sections/ShowcaseSaection";
import Navbar from "./Components/Navbar";
import LogoSection from "./Sections/LogoSection";
import FeatureCards from "./Sections/FeatureCards";
import ExperienceSection from "./Sections/ExperienceSection";
import TechStack from "./Sections/TechStack";
import TestimonialSection from "./Sections/TestimonialSection";
import Contact from "./Sections/Contact";
import FooterSection from "./Sections/FooterSection";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShowcaseSaection />
      <LogoSection/>
      <FeatureCards/>
      <ExperienceSection/>
      <TechStack/>
      <TestimonialSection/>
      <Contact/>
      <FooterSection/>
    </>
  );
};

export default App;
