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
  condition: "Rheumatoid Arthritis (Stiff Finger Condition)",
  review:
    "I experienced significant improvement in finger stiffness, joint mobility and daily comfort through personalized homoeopathic treatment."
  },

  {
    video: video2,
    name: "Patient Testimonial",
    condition: "PCOD",
    review:
      "My symptoms improved considerably and I noticed positive changes in my overall health and hormonal balance after treatment."
  },

  {
    video: video3,
    name: "Patient Testimonial",
    condition: "Chiari Malformation & Disc Prolapse",
    review:
      "The treatment helped reduce discomfort and improve my quality of life through a personalized homoeopathic approach."
  },

  {
    video: video4,
    name: "Patient Testimonial",
    condition: "Nocturnal Enuresis (Bed Wetting)",
    review:
      "There was a remarkable improvement in symptoms, resulting in better confidence and a more comfortable daily routine."
  },

  {
    video: video5,
    name: "Patient Testimonial",
    condition: "Gastric Ulcers, Piles & Anal Fissures",
    review:
      "I experienced significant relief from pain, discomfort and digestive complaints, leading to a noticeable improvement in daily life."
  },

  {
    video: video6,
    name: "Patient Testimonial",
    condition: "Menopausal Syndrome",
    review:
      "The treatment helped manage menopausal symptoms effectively and improved my overall wellbeing and quality of life."
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