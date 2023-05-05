import React from "react";

import "./Home.scss";

import About from "./components/About";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Roadmap from "./components/Roadmap";
import Stats from "./components/Stats";
import Community from "./components/Community";
import ContactUs from "./components/ContactUs";
import Tokensale from "./components/Tokensale";
import { Footer, Header } from "../../components";
import Faqs from "./components/Faqs";
import VideoSection from "./components/VideoSection";
import Annoucements from "./components/Annoucements";
import Teams from "./components/Teams";
import useGetAdminData from "../../hooks/useGetAdminData";

const Home: React.FC = () => {
  const { display_team_section } = useGetAdminData();
  return (
    <>
      <Header />
      <div className="home">
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <VideoSection />
        <Tokensale />
        <Roadmap />
        <Community />
        <Faqs />
        {!!display_team_section && <Teams />}
        <ContactUs />
        <Annoucements />
      </div>
      <Footer />
    </>
  );
};

export default Home;
