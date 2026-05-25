import React from "react";
import "./services.css";

import { Link } from "react-router-dom";

import servicesData from "../../data/servicesData.json";

import {
  FaLeaf,
  FaHeartbeat,
  FaSpa,
  FaFemale,
  FaBrain
} from "react-icons/fa";

function Services() {

  const icons = [
    <FaLeaf />,
    <FaHeartbeat />,
    <FaBrain />,
    <FaFemale />,
    <FaSpa />
  ];

  return (

    <section className="services">

      <div className="services-container">

        {/* Heading */}

        <div className="services-heading">

          <p>OUR SERVICES</p>

          <h2>
            Holistic Treatments
            <br />
            For Complete Wellness
          </h2>

        </div>

        {/* Top Row */}

        <div className="services-row top-row">

          {
            servicesData.slice(0,3).map((service, index) => (

              <div
                className="service-card"
                key={index}
                data-aos="fade-right"
              >

                <div className="service-icon">
                  {icons[index]}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

              </div>

            ))
          }

        </div>

        {/* Bottom Row */}

        <div className="services-row bottom-row">

          {
            servicesData.slice(3,5).map((service, index) => (

              <div
                className="service-card"
                key={index}
                data-aos="fade-left"
              >

                <div className="service-icon">
                  {icons[index + 3]}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

              </div>

            ))
          }

        </div>

        {/* Button */}

        <div className="services-button">

          <Link to="/treatments">

            <button>
              More Services
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}

export default Services;