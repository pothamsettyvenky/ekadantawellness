import React from "react";
import "./TestimonialVideos.css";

import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

import video1 from "../../assets/videos/Testimonials5.mp4";
import video2 from "../../assets/videos/testimonials6.mp4";
import video3 from "../../assets/videos/Testimonials7.mp4";
import video4 from "../../assets/videos/testimonials8.mp4";
import video5 from "../../assets/videos/testimonials9.mp4";
import video6 from "../../assets/videos/testimonials14.mp4";

function VideoCard({ item, reverse }) {

  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false
  });

  return (

    <div
      ref={ref}
      className={`testimonial-item ${reverse ? "reverse" : ""}`}
    >

      <div className="video-box">

        <ReactPlayer
          src={item.video}
          playing={inView}
          muted
          controls
          width="100%"
          height="100%"
          playsinline
        />

      </div>

      <div className="review-box">

        <div className="stars">
          ⭐⭐⭐⭐⭐
        </div>

        <h4>
          {item.condition}
        </h4>

        <p>
          {item.review}
        </p>

        <span>
          {item.name}
        </span>

      </div>

    </div>

  );

}

function TestimonialVideos() {

  const testimonials = [

    {
      video: video1,
      name: "Patient Testimonial",
      condition: "Varicose Veins",
      review:
        "I experienced significant improvement after receiving personalized homoeopathic treatment."
    },

    {
      video: video2,
      name: "Patient Testimonial",
      condition: "Hair Fall",
      review:
        "The treatment helped reduce hair fall and improve overall scalp health."
    },

    {
      video: video3,
      name: "Patient Testimonial",
      condition: "Tonsillitis",
      review:
        "Recurring throat infections reduced considerably after treatment."
    },

    {
      video: video4,
      name: "Patient Testimonial",
      condition: "Skin Complaints",
      review:
        "My skin condition improved naturally and the results have been encouraging."
    },

    {
      video: video5,
      name: "Patient Testimonial",
      condition: "Chronic Condition",
      review:
        "I am very satisfied with the care and the improvement in my health."
    },

    {
      video: video6,
      name: "Patient Testimonial",
      condition: "General Wellness",
      review:
        "Professional treatment and excellent support throughout my healing journey."
    }

  ];

  return (

    <section className="testimonial-videos">

      <div className="testimonial-heading">

        <p>PATIENT STORIES</p>

        <h2>
          Video Testimonials
        </h2>

      </div>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (

          <VideoCard
            key={index}
            item={item}
            reverse={index % 2 !== 0}
          />

        ))}

      </div>

    </section>

  );

}

export default TestimonialVideos;