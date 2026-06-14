import React, { useEffect } from "react";
import "./AboutClinic.css";

import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import FAQ from "../FAQs/Faq";

function AboutClinic() {

  useEffect(() => {

    AOS.init({
      duration: 1200,
      once: true,
    });

  }, []);

  return (

    <section className="about-clinic">

      <div className="about-clinic-container">

        {/* Left Image */}

        <div
          className="clinic-image"
          data-aos="fade-right"
        >

          <img
            src={require("../../assets/images/logo.png")}
            alt="Ekadantha Wellness"
          />

        </div>

        {/* Right Content */}

        <div
          className="clinic-content"
          data-aos="fade-left"
        >

          <p className="clinic-tag">
            ABOUT EKADANTHA WELLNESS
          </p>

          <h2>
            Personalized Care
            <br />
            Through Homoeopathy
          </h2>

          <p className="clinic-description">

            Ekadantha Wellness is a modern online Homoeopathy
            consultation clinic dedicated to providing
            personalized, compassionate and holistic healthcare.

            <br />
            <br />

            We believe every individual is unique, and therefore
            every treatment plan should be tailored to the person
            rather than the disease alone.

            <br />
            <br />

            Our approach focuses on understanding the root cause
            of illness by considering physical symptoms,
            emotional wellbeing, lifestyle and overall health.

            <br />
            <br />

            Through detailed consultations, individualized
            Homoeopathic treatment and continuous follow-up care,
            we help patients achieve lasting wellness from the
            comfort of their homes.

          </p>

          <Link to="/book_appointment">

            <button className="clinic-btn">
              Book Consultation
            </button>

          </Link>

        </div>

      </div>

      {/* Online Consultation Guidelines */}

      <div
        className="consultation-guidelines"
        data-aos="fade-up"
      >

        <h2>
          Online Consultation Guidelines
        </h2>

        <p className="guidelines-intro">
          To ensure a smooth and effective consultation experience,
          please review the following guidelines before your appointment.
        </p>

        <div className="guidelines-grid">

          <div className="guideline-card">
            <h4>Zoom Meeting Link</h4>
            <p>
              The consultation link will be shared by our front desk
              team prior to your scheduled appointment.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Join Early</h4>
            <p>
              Please join the meeting at least 15 minutes before your
              appointment time to avoid delays.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Stable Internet</h4>
            <p>
              Ensure you have a reliable internet connection for an
              uninterrupted consultation experience.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Quiet Environment</h4>
            <p>
              Attend the consultation from a calm and quiet place to
              facilitate better communication with the doctor.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Phone on Silent</h4>
            <p>
              Please keep your phone on silent mode and minimize
              distractions during the consultation.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Rescheduling Policy</h4>
            <p>
              Late joining or missed appointments may require
              rescheduling based on doctor availability.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Medical Records</h4>
            <p>
              Keep previous medical reports, prescriptions,
              and investigation results readily available.
            </p>
          </div>

          <div className="guideline-card">
            <h4>Payment Policy</h4>
            <p>
              Consultation fees once paid are non-refundable
              and non-transferable.
            </p>
          </div>

        </div>

      </div>
<FAQ/>
    </section>

  );
}

export default AboutClinic;