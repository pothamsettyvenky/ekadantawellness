import React from "react";
import "./SpecializedCare.css";

import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import pcodImg from "../../assets/images/pcod.jpg";
import thyroidImg from "../../assets/images/Thyroid.jpg";
import menopauseImg from "../../assets/images/Menopausal.jpg";
import endometriosisImg from "../../assets/images/Endometriosis.jpg";

function SpecializedCare() {

  const services = [

    {
      image: pcodImg,
      title: "PCOD",
      description:
        "Personalized homoeopathic support focused on hormonal balance, menstrual regularity, fertility wellness and overall reproductive health."
    },

    {
      image: thyroidImg,
      title: "Thyroid Issues",
      description:
        "Natural treatment plans supporting thyroid balance, metabolism regulation, energy levels and long-term wellness."
    },

    {
      image: menopauseImg,
      title: "Menopausal Syndrome",
      description:
        "Gentle and individualized care designed to ease hormonal, emotional and physical changes during menopause."
    },

    {
      image: endometriosisImg,
      title: "Endometriosis",
      description:
        "Holistic support focused on reducing discomfort, improving quality of life and promoting reproductive health."
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
            Specialized homoeopathic care focused on hormonal balance,
            reproductive health and long-term women wellness.
          </span>

        </div>

        {/* Grid */}

        <div className="specialized-grid">

          {/* Main Image */}

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

            {services.map((service, index) => (

              <div
                className="specialized-card"
                key={index}
                data-aos="fade-left"
              >

                <div className="specialized-image-box">

                  <img
                    src={service.image}
                    alt={service.title}
                  />

                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="plus-circle">
                  <FaPlus />
                </div>

              </div>

            ))}

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