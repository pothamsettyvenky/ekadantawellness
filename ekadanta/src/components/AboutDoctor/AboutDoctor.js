import React from "react";
import "./AboutDoctor.css";

import { Link } from "react-router-dom";

function AboutDoctor() {

  return (

    <section className="about-doctor">

      <div className="about-doctor-container">

        {/* Doctor Image */}

        <div
          className="doctor-image"
          data-aos="fade-right"
        >

          <img
            src={require("../../assets/images/logo.png")}
            alt="Dr Priya"
          />

        </div>

        {/* Doctor Info */}

        <div
          className="doctor-content"
          data-aos="fade-left"
        >

          <p className="doctor-tag">
            MEET YOUR DOCTOR
          </p>

          <h2>
            Dr. S. Shripriya
          </h2>

          <h4>
            BHMS, MD
          </h4>

          <p className="doctor-description">

            Dr. S. Shripriya is a dedicated homeopathic practitioner
            focused on personalized and holistic healing. With expertise
            ranging from paediatric to geriatric care, she believes in
            treating the root cause rather than just the symptoms.
            Her patient-centered approach combines homeopathy with deep
            understanding of emotional wellbeing, lifestyle and overall
            health to create long-term wellness solutions.

          </p>

          {/* Expertise */}

          <div className="doctor-expertise">

            <span>Women Wellness</span>

            <span>PCOD Care</span>

            <span>Respiratory Care</span>

            <span>Stress Management</span>

            <span>ADHD & Autism</span>

            <span>Skin Complaints</span>

          </div>

          {/* Button */}

          <Link to="/about/dr-priya">

            <button className="doctor-btn">
              More Info
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}

export default AboutDoctor;