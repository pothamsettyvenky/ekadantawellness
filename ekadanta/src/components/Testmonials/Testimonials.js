import React from "react";
import "./Testimonials.css";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/images/testimonials1.jpeg";
import img2 from "../../assets/images/testimonials2.jpeg";
import img3 from "../../assets/images/testimonials3.jpeg";
import img4 from "../../assets/images/testimonials44.jpeg";

function Testimonials() {

  const testimonials = [
    {
      image: img1,
      title: "Varicose Veins Treatment",
      text:
        "Significant improvement in vein appearance, pain and discomfort through individualized homoeopathic treatment."
    },
    {
      image: img2,
      title: "Hair Growth Support",
      text:
        "Noticeable improvement in hair density, scalp health and overall confidence after treatment."
    },
   {
  image: img3,
  title: "Ganglion Cyst Treatment",
  text:
    "Noticeable reduction in the size of the ganglion cyst along with relief from discomfort and improved joint mobility through individualized homoeopathic treatment."
},
    {
      image: img4,
      title: "Tonsillitis Recovery",
      text:
        "Rapid relief from throat pain, fever and inflammation with personalized care."
    }
  ];

  return (

    <section className="testimonials-section">

      <div className="testimonial-heading">

        <p>PATIENT SUCCESS STORIES</p>

        <h2>
          Real Results,
          <br />
          Real Patients
        </h2>

      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="testimonial-swiper"
      >

        {testimonials.map((item, index) => (

          <SwiperSlide key={index}>

            <div className="testimonial-card">

              <div className="testimonial-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

              </div>

              <div className="testimonial-content">

                <span className="stars">
                  ★★★★★
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <Link
                  to="/feedback"
                  className="view-more-btn"
                >
                  View More
                </Link>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>

  );
}

export default Testimonials;