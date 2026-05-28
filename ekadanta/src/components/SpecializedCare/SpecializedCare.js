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
      title: "PCOD",
      description:
        "Personalized homeopathic support focused on hormonal balance and reproductive wellness."
    },

    {
      icon: <FaHeartbeat />,
      title: "Thyroid Issues",
      description:
        "Natural treatment plans supporting thyroid balance and overall metabolism."
    },

    {
      icon: <FaSpa />,
      title: "Menopausal Syndrome",
      description:
        "Gentle care designed to ease hormonal and emotional changes naturally."
    },

    {
      icon: <FaBrain />,
      title: "Endometriosis",
      description:
        "Holistic support focused on long-term reproductive health and comfort."
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
            Through Homoeopathy
          </h2>

          <span>
            Specialized homeopathic care focused on hormonal balance,
            reproductive health and long-term women wellness.
          </span>

        </div>

        {/* Grid */}

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