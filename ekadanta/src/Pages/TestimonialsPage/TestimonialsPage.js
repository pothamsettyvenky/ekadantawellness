import React, { useState } from "react";

import "./TestimonialsPage.css";

import TestimonialVideos from "../../components/TestimonialVideos/TestimonialVideos";

import testimonial1 from "../../assets/images/testimonials1.jpeg";
import testimonial2 from "../../assets/images/testimonials2.jpeg";
import testimonial3 from "../../assets/images/testimonials3.jpeg";
import testimonial10 from "../../assets/images/testimonials10.jpeg";
import testimonial11 from "../../assets/images/testimonials11.jpeg";
import testimonial12 from "../../assets/images/testimonials12.jpeg";
import testimonial13 from "../../assets/images/testimonials13.jpeg";
import testimonial44 from "../../assets/images/testimonials44.jpeg";

function TestimonialsPage() {

  const [selectedImage, setSelectedImage] = useState(null);

  const successStories = [
    testimonial1,
    testimonial2,
    testimonial3,
    testimonial10,
    testimonial11,
    testimonial12,
    testimonial13,
    testimonial44
  ];

  return (

    <section className="testimonials-page">

      {/* Hero Section */}

      <div className="testimonials-hero">

        <p className="hero-tag">
          PATIENT TESTIMONIALS
        </p>

        <h1>
          Real Stories.
          <br />
          Real Healing.
        </h1>

        <span>
          Discover how personalized homoeopathic care has helped
          patients overcome chronic and acute health concerns and
          improve their quality of life.
        </span>

      </div>

      {/* Video Testimonials */}

      <TestimonialVideos />

      {/* Success Stories */}

      <section className="success-stories">

        <div className="section-heading">

          <p>SUCCESS STORIES</p>

          <h2>
            Before & After Results
          </h2>

          <span>
            A glimpse of the positive changes experienced by our patients.
          </span>

          <div className="gallery-info">

            🔍 Tap or click any image to view it in full screen

          </div>

        </div>

        <div className="gallery-grid">

          {successStories.map((image, index) => (

            <div
              className="gallery-card"
              key={index}
              onClick={() => setSelectedImage(image)}
            >

              <img
                src={image}
                alt={`Patient Success Story ${index + 1}`}
              />

              <div className="view-icon">
                🔍
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="testimonial-cta">

        <h2>
          Begin Your Healing Journey Today
        </h2>

        <p>
          Schedule a consultation and experience personalized
          homoeopathic care for you and your family.
        </p>

        <a
          href="/book_appointment"
          className="cta-btn"
        >
          Book Appointment
        </a>

      </section>

      {/* Image Popup */}

      {selectedImage && (

        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >

          <button
            className="close-btn"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Full View"
            onClick={(e) => e.stopPropagation()}
          />

        </div>

      )}

    </section>

  );

}

export default TestimonialsPage;