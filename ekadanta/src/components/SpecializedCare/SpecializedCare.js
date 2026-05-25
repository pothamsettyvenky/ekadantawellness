import React from "react";
import "./SpecializedCare.css";

import {
  FaFemale,
  FaHeartbeat,
  FaSpa,
  FaBrain,
  FaPlus
} from "react-icons/fa";

import { Link } from "react-router-dom";

function SpecializedCare() {

  const services = [

    {
      icon: <FaFemale />,
      title: "PCOD Care",
      description:
        "Natural support to balance hormones, regulate cycles and improve overall wellbeing."
    },

    {
      icon: <FaHeartbeat />,
      title: "Hormonal Wellness",
      description:
        "Holistic care for thyroid imbalance, irregular cycles and hormonal health."
    },

    {
      icon: <FaSpa />,
      title: "Menopause Support",
      description:
        "Gentle treatment to ease menopause symptoms and emotional wellbeing."
    },

    {
      icon: <FaBrain />,
      title: "Stress Management",
      description:
        "Mind-body wellness support for stress, anxiety and emotional exhaustion."
    }

  ];

  return (

    <section className="specialized-care">

      <div className="specialized-container">

        {/* Heading */}

        <div
          className="specialized-heading"
          data-aos="fade-up"
        >

          <p>WOMEN WELLNESS</p>

          <h2>
            Women Wellness
            <br />
            Through Homeopathy
          </h2>

          <span>
            Natural, gentle and personalized care to support every
            stage of a woman’s wellness journey.
          </span>

        </div>

        {/* Grid Layout */}

        <div className="specialized-grid">

          {/* Image */}

          <div
            className="specialized-image"
            data-aos="fade-right"
          >

            <img
              src={require("../../assets/images/women_wellness.png")}
              alt="Women Wellness"
            />

          </div>

          {/* Cards */}

          <div className="specialized-cards">

            {
              services.map((service, index) => (

                <div
                  className="specialized-card"
                  key={index}
                  data-aos="fade-left"
                >

                  <div className="specialized-icon">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <div className="plus-circle">
                    <FaPlus />
                  </div>

                </div>

              ))
            }

          </div>

        </div>

        {/* Button */}

        <div className="specialized-btn-wrapper">

          <Link to="/treatments#women-wellness">

            <button>
              More Details
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}

export default SpecializedCare;