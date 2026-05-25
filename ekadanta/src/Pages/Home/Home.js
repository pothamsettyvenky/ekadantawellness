import React, { useEffect } from "react";

import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../Pages/Banner/banner";
import FeaturedService from "../../components/FeaturedService/FeaturedService";
import SpecializedCare from "../../components/SpecializedCare/SpecializedCare";
import AboutDoctor from "../../components/AboutDoctor/AboutDoctor";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {

  useEffect(() => {

    AOS.init({
      duration: 1200,
      once: true
    });

  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedService/>
      <SpecializedCare/>
      <AboutDoctor/>
    </>
  );
}

export default Home;