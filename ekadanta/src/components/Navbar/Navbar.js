import React, { useState } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className=" brand ">
          <div className=" logo-image ">
            <img
              src={require("../../assets/images/logo.png")}
              alt="Ekadanta wellness"
            />
          </div>
          <div className="logo">
            <Link to="/">Ekadantha Wellness</Link>

            <p>Holistic Healing & Homoeopathy Care</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* About Dropdown */}
          <li className="dropdown">
            <span>About</span>

            <div className="dropdown-menu">
              <Link to="/about-clinic">About Clinic</Link>
              <Link to="/doctor">Dr. Priya</Link>
            </div>
          </li>

          {/* Patients Corner */}
          <li className="dropdown">
            <span>Patients Corner</span>

            <div className="dropdown-menu">
              <Link to="/faqs">FAQs</Link>
              <Link to="/feedback">Patient Feedback</Link>
            </div>
          </li>
          {/* Media */}
          <li className="dropdown">
            <span>Media</span>

            <div className="dropdown-menu">
              <Link to="/media">Awards</Link>
            </div>
          </li>
          <li>
            <Link to="/treatments">Treatments</Link>
          </li>

          <li>
            <Link to="/book-appointment" className="appointment-btn">
              Book Appointment
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
