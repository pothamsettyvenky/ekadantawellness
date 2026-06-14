import React from "react";
import "./Awards.css";

import award9 from "../../assets/images/gallery1.jpeg";
import award2 from "../../assets/images/gallery2.jpeg";
import award3 from "../../assets/images/gallery3.jpeg";
import award4 from "../../assets/images/gallery4.jpeg";
import award5 from "../../assets/images/gallery5.jpeg";
import award6 from "../../assets/images/gallery6.jpeg";
import award7 from "../../assets/images/gallery7.jpeg";
import award8 from "../../assets/images/hero.jpeg";
import award1 from "../../assets/images/hero2.jpeg";

const awards = [
  award1,
  award2,
  award3,
  award4,
  award5,
  award6,
  award7,
  award8,
  award9,
];

function Awards() {
  return (
    <div className="awards-page">
      <h1>Awards & Recognition</h1>

      <div className="awards-grid">
        {awards.map((award, index) => (
          <div className="award-card" key={index}>
            <img
              src={award}
              alt={`Award ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Awards;