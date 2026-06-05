import React, { useEffect } from "react";
import "./Doctor.css";

import AOS from "aos";
import "aos/dist/aos.css";
import DoctorGallery from "../../components/DoctorGallery/DoctorGallery";

function Doctor() {

  useEffect(() => {

    AOS.init({
      duration:1200,
      once:true
    });

  }, []);

  return (

    <section className="doctor-page">

      <div className="doctor-container">

        {/* Left */}

        <div
          className="doctor-image"
          data-aos="fade-right"
        >

          <img
            src={require("../../assets/images/hero.jpeg")}
            alt="Dr. S. Shripriya"
          />

        </div>

        {/* Right */}

        <div
          className="doctor-content"
          data-aos="fade-left"
        >

          <p className="doctor-tag">
            MEET YOUR DOCTOR
          </p>

          <h1>
            Dr. S. Shripriya
          </h1>

          <h3>
            BHMS, MD
          </h3>

          <p className="doctor-description">

            Dr. S. Shripriya is a dedicated Homoeopathic physician
            passionate about helping patients achieve lasting
            wellness through individualized and holistic care.

            <br />
            <br />

            She completed her Homoeopathic medical education at
            MNR Homoeopathy Medical College, Sangareddy,
            Telangana and specialized in the Department of
            Organon and Philosophy.

            <br />
            <br />

            Her approach focuses on understanding each patient
            as a whole, taking into account physical symptoms,
            emotional wellbeing, lifestyle and individual
            constitution.

            <br />
            <br />

            Through personalized treatment plans and continuous
            follow-up care, she aims to address the root cause
            of illness and promote long-term healing.

          </p>

          {/* Expertise */}

          <div className="doctor-expertise">

            <span>Women Wellness</span>

            <span>PCOD Care</span>

            <span>ADHD & Autism</span>

            <span>Respiratory Care</span>

            <span>Hormonal Disorders</span>

            <span>Migraine Care</span>

            <span>Skin Complaints</span>

            <span>Stress Management</span>

          </div>

        </div>

      </div>
{/* Philosophy Section */}

<div
  className="philosophy-section"
  data-aos="fade-up"
>
  <h2>My Healing Philosophy</h2>

  <p>
    I believe that every individual is unique and deserves a treatment
    approach tailored specifically to their physical, emotional, and mental
    well-being. Homoeopathy is not just about treating symptoms but about
    understanding the person as a whole and addressing the root cause of
    illness.
  </p>

  <p>
    Through detailed consultations, careful case analysis, and
    individualized remedies, my goal is to stimulate the body's natural
    healing abilities and support long-term wellness. Every patient is
    treated with compassion, respect, and a commitment to helping them
    achieve a healthier and more balanced life.
  </p>
</div>

{/* Areas of Expertise */}

<div
  className="special-interest-section"
  data-aos="fade-up"
>
  <h2>Areas of Special Interest</h2>

  <div className="special-interest-grid">

    <div className="special-card">
      <h4>Women's Health</h4>
      <p>
        Comprehensive care for PCOD, hormonal imbalances, menstrual
        irregularities, fertility support, and menopause-related concerns.
      </p>
    </div>

    <div className="special-card">
      <h4>Child Health</h4>
      <p>
        Supportive homoeopathic treatment for allergies, recurrent
        infections, ADHD, autism spectrum concerns, and immunity building.
      </p>
    </div>

    <div className="special-card">
      <h4>Skin Disorders</h4>
      <p>
        Individualized treatment plans for acne, eczema, psoriasis,
        pigmentation, and chronic skin complaints.
      </p>
    </div>

    <div className="special-card">
      <h4>Lifestyle Disorders</h4>
      <p>
        Care for migraine, stress, anxiety, digestive issues, sleep
        disturbances, and chronic health conditions.
      </p>
    </div>

  </div>
</div>

{/* Why Choose */}

<div
  className="why-choose-section"
  data-aos="fade-up"
>
  <h2>Why Choose Dr. S. Shripriya</h2>

  <div className="why-grid">

    <div className="why-item">
      Personalized Treatment Plans
    </div>

    <div className="why-item">
      Holistic Patient Assessment
    </div>

    <div className="why-item">
      Root Cause Focused Healing
    </div>

    <div className="why-item">
      Compassionate Patient Care
    </div>

    <div className="why-item">
      Long-Term Follow-Up Support
    </div>

    <div className="why-item">
      Safe & Natural Healing Methods
    </div>

  </div>
</div>
      {/* Qualifications */}

      <div
        className="qualification-section"
        data-aos="fade-up"
      >

        <h2>
          Education & Qualifications
        </h2>

        <div className="qualification-card">

          <div className="qualification-item">

            <h4>BHMS</h4>

            <p>
              Bachelor of Homoeopathic Medicine
              and Surgery
            </p>

          </div>

          <div className="qualification-item">

            <h4>MD</h4>

            <p>
              Doctor of Medicine in Homoeopathy
            </p>

          </div>

          <div className="qualification-item">

            <h4>Specialization</h4>

            <p>
              Organon & Philosophy
            </p>

          </div>

          <div className="qualification-item">

            <h4>Languages</h4>

            <p>
              English, Telugu, Hindi.
            </p>

          </div>

        </div>

      </div>
<DoctorGallery/>
    </section>

  );
}

export default Doctor;