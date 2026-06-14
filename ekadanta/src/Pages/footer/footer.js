import React from "react";
import "./footer.css";

import {
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}

        <div className="footer-about">
          <img
            src={require("../../assets/images/logo.png")}
            alt="Ekadantha Wellness"
          />

          <h2>Ekadantha Wellness</h2>

          <p>
            Personalized Homoeopathic care focused on holistic healing,
            emotional wellbeing and long-term wellness through natural
            treatment.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/ekadantha_homoeopathy_wellness/">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/about/clinic">About Clinic</Link>

          <Link to="/about/doctor">Dr. Shripriya</Link>

          <Link to="/treatments">Treatments</Link>

          <Link to="/patientscorner/faq">FAQs</Link>
        </div>

        {/* Treatments */}

        <div className="footer-links">
          <h3>Treatments</h3>

          <Link to="/treatments#women-wellness">Women Wellness</Link>

          <Link to="/treatments#child-wellness">Child Wellness</Link>

          <Link to="/treatments#general-wellness">General Wellness</Link>

          <Link to="/treatments#other-diseases">Other Diseases</Link>
        </div>

        {/* Contact */}

        <div className="footer-contact">
          <h3>Contact</h3>

          <div className="footer-contact-item">
            <FaPhoneAlt />

            <span>+91 91825 29087</span>
          </div>

          <div className="footer-contact-item">
            <FaEnvelope />

            <span>ekadanthawellness@gmail.com</span>
          </div>

          <div className="footer-contact-item">
            <FaMapMarkerAlt />

            <span>Hyderabad, Telangana</span>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="footer-bottom">
        <p>© 2026 Ekadantha Wellness. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
