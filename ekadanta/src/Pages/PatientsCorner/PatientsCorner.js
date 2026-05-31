import React, { useEffect } from "react";
import "./PatientsCorner.css";

import AOS from "aos";
import "aos/dist/aos.css";

import FAQ from "../FAQs/Faq";

function PatientsCorner() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <section className="patients-corner">
      <div className="patients-hero" data-aos="fade-up">
        <p className="patients-tag">PATIENTS CORNER</p>

        <h1>
          Information & Support
          <br />
          For Our Patients
        </h1>

        <p className="patients-description">
          Welcome to the Patients Corner of Ekadantha Wellness. This section has
          been created to help patients better understand our consultation
          process, homoeopathic care, appointment guidelines, and commonly asked
          questions.
          <br />
          <br />
          We believe that informed patients make confident healthcare decisions.
          Whether you are visiting us for the first time or continuing your
          healing journey, this page provides useful information to make your
          experience smooth and comfortable.
        </p>
      </div>

      <div className="faq-intro" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>

        <p>
          FAQs (Frequently Asked Questions) are a collection of common questions
          that patients often ask regarding homoeopathic treatment, online
          consultations, appointments, follow-ups, and clinic policies.
          <br />
          <br />
          If you have any questions that are not covered below, please feel free
          to contact us and our team will be happy to assist you.
        </p>
      </div>

      <FAQ />
    </section>
  );
}

export default PatientsCorner;
