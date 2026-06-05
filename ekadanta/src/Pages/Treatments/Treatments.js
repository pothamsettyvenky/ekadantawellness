import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Treatments.css";

function Treatments() {

  const location = useLocation();

  const [activeTab, setActiveTab] = useState("women");

  useEffect(() => {

  const hash = location.hash.replace("#", "");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (
    hash === "women" ||
    hash === "children" ||
    hash === "other"
  ) {

    setActiveTab(hash);

    setTimeout(() => {

      document
        .getElementById("treatment-tabs")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }, 300);

  }

}, [location]);

  const treatments = {

    women: [

      {
        title: "PCOD",
        description:
          "Support for hormonal balance, menstrual regularity and reproductive wellness.",
        link: "https://en.wikipedia.org/wiki/Polycystic_ovary_syndrome"
      },

      {
        title: "Thyroid Issues",
        description:
          "Care focused on thyroid health, metabolism and overall wellbeing.",
        link: "https://en.wikipedia.org/wiki/Thyroid_disease"
      },

      {
        title: "Menopausal Syndrome",
        description:
          "Natural support for hormonal and emotional changes during menopause.",
        link: "https://en.wikipedia.org/wiki/Menopause"
      },

      {
        title: "Endometriosis",
        description:
          "Holistic support for reproductive health and chronic pelvic discomfort.",
        link: "https://en.wikipedia.org/wiki/Endometriosis"
      }

    ],

    children: [

      {
        title: "Tonsillitis",
        description:
          "Support for recurring throat infections and tonsil inflammation.",
        link: "https://en.wikipedia.org/wiki/Tonsillitis"
      },

      {
        title: "Adenoids",
        description:
          "Management of enlarged adenoids and related breathing difficulties.",
        link: "https://en.wikipedia.org/wiki/Adenoid"
      },

      {
        title: "ADHD",
        description:
          "Individualized care supporting focus, concentration and behavior.",
        link: "https://en.wikipedia.org/wiki/Attention_deficit_hyperactivity_disorder"
      },

      {
        title: "Autism",
        description:
          "Supportive holistic care tailored to individual needs.",
        link: "https://en.wikipedia.org/wiki/Autism"
      },

      {
        title: "Learning Disabilities",
        description:
          "Care aimed at supporting learning and developmental growth.",
        link: "https://en.wikipedia.org/wiki/Learning_disability"
      },

      {
        title: "Recurrent Fevers",
        description:
          "Support for children experiencing repeated fever episodes.",
        link: "https://en.wikipedia.org/wiki/Fever"
      },

      {
        title: "Low Immunity",
        description:
          "Helping strengthen overall resistance and wellness.",
        link: "https://en.wikipedia.org/wiki/Immune_system"
      },

      {
        title: "Underdeveloped Children",
        description:
          "Support for growth, nutrition and developmental milestones.",
        link: "https://en.wikipedia.org/wiki/Child_development"
      }

    ],

    other: [

      {
        title: "Allergies",
        description:
          "Support for seasonal, environmental and food allergies.",
        link: "https://en.wikipedia.org/wiki/Allergy"
      },

      {
        title: "IBS",
        description:
          "Management of digestive discomfort and bowel irregularities.",
        link: "https://en.wikipedia.org/wiki/Irritable_bowel_syndrome"
      },

      {
        title: "IBD",
        description:
          "Supportive care for inflammatory bowel conditions.",
        link: "https://en.wikipedia.org/wiki/Inflammatory_bowel_disease"
      },

      {
        title: "Gastric Complaints",
        description:
          "Relief-focused care for acidity, bloating and digestive issues.",
        link: "https://en.wikipedia.org/wiki/Gastritis"
      },

      {
        title: "Respiratory Complaints",
        description:
          "Support for breathing difficulties and recurrent respiratory conditions.",
        link: "https://en.wikipedia.org/wiki/Respiratory_disease"
      },

      {
        title: "Age Related Complaints",
        description:
          "Care focused on healthy ageing and quality of life.",
        link: "https://en.wikipedia.org/wiki/Ageing"
      },

      {
        title: "Rheumatoid Arthritis",
        description:
          "Supportive management of joint inflammation and pain.",
        link: "https://en.wikipedia.org/wiki/Rheumatoid_arthritis"
      },

      {
        title: "Osteoarthritis",
        description:
          "Care aimed at mobility, comfort and joint health.",
        link: "https://en.wikipedia.org/wiki/Osteoarthritis"
      },

      {
        title: "Warts",
        description:
          "Holistic support for common skin growths and recurrence prevention.",
        link: "https://en.wikipedia.org/wiki/Wart"
      }

    ]

  };

  return (

    <section className="treatments-page">

      <div className="treatments-heading">

        <p>TREATMENTS</p>

        <h1>
          Conditions We Treat
        </h1>

        <span>
          Comprehensive homoeopathic care for women, children and a wide range of acute and chronic health concerns.
        </span>

      </div>

      <div
        id="treatment-tabs"
        className="treatment-tabs"
      >

        <button
          className={activeTab === "women" ? "active" : ""}
          onClick={() => setActiveTab("women")}
        >
          Women Wellness
        </button>

        <button
          className={activeTab === "children" ? "active" : ""}
          onClick={() => setActiveTab("children")}
        >
          Child Wellness
        </button>

        <button
          className={activeTab === "other" ? "active" : ""}
          onClick={() => setActiveTab("other")}
        >
          Other Conditions
        </button>

      </div>

      <div className="treatments-grid">

        {treatments[activeTab].map((item, index) => (

          <div
            className="treatment-card"
            key={index}
          >

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-btn"
            >
              Read More
            </a>

          </div>

        ))}

      </div>

    </section>

  );
}

export default Treatments;