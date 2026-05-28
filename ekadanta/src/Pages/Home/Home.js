import React, { useEffect } from "react";

import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../Pages/Banner/banner";

import FeaturedService from "../../components/FeaturedService/FeaturedService";

import SpecializedCare from "../../components/SpecializedCare/SpecializedCare";

import AboutDoctor from "../../components/AboutDoctor/AboutDoctor";

import AOS from "aos";
import "aos/dist/aos.css";
import Faq from "../FAQs/Faq";
import Footer from "../footer/footer";

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
<AboutDoctor />
      {/* CHILD WELLNESS */}

      <FeaturedService

        tag="CHILD WELLNESS"

        title1="Healthy Growth"
        title2="For Every Child"

        description="Gentle homeopathic care supporting ADHD, autism, tonsillitis, immunity concerns, recurrent fevers and healthy child development."

        quote="Personalized child wellness care focused on immunity, growth and emotional wellbeing."

        image={require("../../assets/images/child_wellness.png")}

        redirect="/treatments#children"

      />

       
      <SpecializedCare />
      <FeaturedService

        tag="OTHER DISEASES"

        title1="Complete Care"
        title2="For Better Living"

        description="Comprehensive treatment for allergies, IBS, IBD, respiratory complaints, arthritis, gastric issues and age-related conditions."

        quote="Natural healing focused on improving quality of life through personalized care."

        image={require("../../assets/images/other_diseases.png")}

        redirect="/treatments#other-diseases"

      />

     <Faq/>
     <Footer/>

    </>
  );
}

export default Home;