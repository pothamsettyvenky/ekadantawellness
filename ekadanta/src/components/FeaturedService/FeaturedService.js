import React from "react";
import "./FeaturedService.css";

import { Link } from "react-router-dom";

function FeaturedService({
  tag,
  title1,
  title2,
  description,
  quote,
  image,
  redirect
}) {

  return (

    <section className="featured-service">

      <div className="featured-container">

        {/* Left Image */}

        <div
          className="featured-image"
          data-aos="fade-right"
        >

          <img
            src={image}
            alt={tag}
          />

        </div>

        {/* Right Content */}

        <div
          className="featured-content"
          data-aos="fade-left"
        >

          <p className="featured-tag">
            {tag}
          </p>

          <h2>
            {title1}
            <br />
            {title2}
          </h2>

          <p className="featured-description">
            {description}
          </p>

          {/* Quote Box */}

          <div className="featured-quote">

            <div className="quote-icon">
              ✦
            </div>

            <p>
              {quote}
            </p>

          </div>

          {/* Button */}

          <Link to={redirect}>

            <button className="featured-btn">
              More Details
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedService;