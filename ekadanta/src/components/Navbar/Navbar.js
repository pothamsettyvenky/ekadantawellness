import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="brand">
          <div className="logo-image">
            <img
              src={require("../../assets/images/logo.png")}
              alt="Ekadanta Wellness"
            />
          </div>

          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              Ekadantha Wellness
            </Link>

            <p>Holistic Healing with Homoeopathy</p>
          </div>
        </div>

        {/* Navigation */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          {/* About */}
          <li className="dropdown">
            <span>About</span>

            <div className="dropdown-menu">
              <Link to="/about/clinic" onClick={closeMenu}>
                About Clinic
              </Link>

              <Link to="/about/doctor" onClick={closeMenu}>
                Dr. Priya
              </Link>
            </div>
          </li>

          {/* Patients Corner */}
          <li className="dropdown">
            <span>Patients Corner</span>

            <div className="dropdown-menu">
              <Link to="/patientscorner/faq" onClick={closeMenu}>
                FAQs
              </Link>

              <Link to="/feedback" onClick={closeMenu}>
                Patient Feedback
              </Link>
            </div>
          </li>

          {/* Media */}
          <li className="dropdown">
            <span>Media</span>

            <div className="dropdown-menu">
              <Link to="/media" onClick={closeMenu}>
                Awards
              </Link>
            </div>
          </li>

          <li>
            <Link to="/treatments" onClick={closeMenu}>
              Treatments
            </Link>
          </li>

          <li>
            <Link
              to="/book-appointment"
              className="appointment-btn"
              onClick={closeMenu}
            >
              Book Appointment
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;