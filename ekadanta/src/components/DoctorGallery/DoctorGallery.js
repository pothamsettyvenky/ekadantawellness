import React from "react";
import "./DoctorGallery.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

function DoctorGallery() {
  const images = [
    require("../../assets/images/gallery1.jpeg"),
    require("../../assets/images/gallery2.jpeg"),
    require("../../assets/images/gallery3.jpeg"),
    require("../../assets/images/gallery4.jpeg"),
    require("../../assets/images/gallery5.jpeg"),
    require("../../assets/images/gallery6.jpeg"),
    require("../../assets/images/gallery7.jpeg"),
  ];

  return (
    <section className="doctor-gallery">
      <div className="gallery-container">
        <div className="gallery-heading" data-aos="fade-up">
          <p>PROFESSIONAL JOURNEY</p>

          <h2>
            Moments Of Care
            <br />& Excellence
          </h2>

          <span>
            A glimpse into academic achievements, professional milestones and
            dedication to Homoeopathic care.
          </span>
        </div>

        {/* Desktop + Tablet Collage */}

        <div className="gallery-grid">
          <div className="gallery-item item1">
            <img src={images[0]} alt="" />
          </div>

          <div className="gallery-item item2">
            <img src={images[1]} alt="" />
          </div>

          <div className="gallery-item item3">
            <img src={images[2]} alt="" />
          </div>

          <div className="gallery-item item4">
            <img src={images[3]} alt="" />
          </div>

          <div className="gallery-item item5">
            <img src={images[4]} alt="" />
          </div>

          <div className="gallery-item item6">
            <img src={images[5]} alt="" />
          </div>

          <div className="gallery-item item7">
            <img src={images[6]} alt="" />
          </div>
        </div>

        {/* Mobile Slider */}

        <div className="mobile-gallery">
          <Swiper
            slidesPerView={1.15}
            centeredSlides={true}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default DoctorGallery;
