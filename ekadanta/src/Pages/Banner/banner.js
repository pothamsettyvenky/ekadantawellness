import React from "react";
import "./banner.css";

import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-tagline">NATURAL • SAFE • PERSONALIZED</p>

          <h1>
            Natural Healing,
            <br />
            Lasting Wellness
          </h1>

          <p className="hero-description">
            Holistic Homoeopathic care to cure diseases, restore balance, boost immunity
            and bring harmony to your life.
          </p>

          <Link to="/book-appointment">
            <button className="hero-btn">Book Appointment</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
