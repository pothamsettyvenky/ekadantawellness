import React from "react";
import "./FeaturedService.css";

import { Link } from "react-router-dom";

function FeaturedService() {
  return (
    <section className="featured-service">
      <div className="featured-container">
        {/* Left Image */}

        <div className="featured-image" data-aos="fade-right">
          <img
            src={require("../../assets/images/generall_wellness.png")}
            alt="General Wellness"
          />
        </div>

        {/* Right Content */}

        <div className="featured-content" data-aos="fade-left">
          <p className="featured-tag">GENERAL WELLNESS</p>

          <h2>
            Everyday Wellness
            <br />
            Through Natural Healing
          </h2>

          <p className="featured-description">
            Personalized Homoeopathy pathic treatment for respiratory issues,
            gastric complaints, lifestyle diseases, stress and overall wellness
            through natural healing.
          </p>

          {/* Quote Card */}

          <div className="featured-quote">
            <div className="quote-icon">✦</div>

            <p>
              Natural healing focused on treating the root cause, restoring
              balance and improving long-term wellness.
            </p>
          </div>

          {/* Button */}

          <Link to="/treatments#general-wellness">
            <button className="featured-btn">More Details</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedService;
