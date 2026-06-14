import React, { useState } from "react";
import "./Faq.css";
const faqData = [
  {
    question: "Do all patients receive the same white pills?",
    answer:
      "No. While many Homoeopathic medicines may look similar externally, the medicine prescribed is highly individualized. A Homoeopath selects remedies based on your physical symptoms, mental and emotional state, lifestyle, medical history, and overall constitution. Two people with the same diagnosis may receive entirely different medicines.",
  },
  {
    question: "How long does Homoeopathic treatment usually take?",
    answer:
      "The duration of treatment depends on the nature of the condition. Acute illnesses such as fever, cold, allergies, or infections may respond quickly, sometimes within days. Chronic conditions like migraine, skin disorders, hormonal issues, or autoimmune complaints may require longer treatment for deeper healing and long-term results.",
  },
  {
    question:
      "Does Homoeopathy have side effects? Is it safe for pregnant women and children?",
    answer:
      "Homoeopathy is generally considered gentle and safe when prescribed by a qualified practitioner. It is commonly used for children, elderly individuals, and even during pregnancy under professional guidance.",
  },
  {
    question: "Are medicines deliverable? How long does delivery take?",
    answer:
      "Yes, medicines can usually be delivered directly to your doorstep after consultation. Most orders are dispatched promptly and reach within a few working days.",
  },
  {
    question:
      "Can Homoeopathic medicines be taken along with allopathic medications?",
    answer:
      "In many cases, yes. However, it is important to inform your doctor about all ongoing medications, supplements, or treatments.",
  },
  {
    question: "Does Homoeopathy work slowly?",
    answer:
      "Not always. Homoeopathy can act very quickly in acute conditions such as fever, food poisoning, cough, injuries, acidity, or allergies.",
  },
];
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="faq-section">
      {" "}
      <div className="faq-container">
        {" "}
        <div className="faq-heading">
          {" "}
          <p>FREQUENTLY ASKED QUESTIONS</p>{" "}
          <h2>Your Questions, Answered</h2>{" "}
        </div>{" "}
        <div className="faq-wrapper">
          {" "}
          {faqData.map((faq, index) => (
            <div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              {" "}
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {" "}
                <span>{faq.question}</span>{" "}
                <div className="faq-icon">
                  {" "}
                  {activeIndex === index ? "−" : "+"}{" "}
                </div>{" "}
              </button>{" "}
              <div
                className={`faq-answer ${activeIndex === index ? "show" : ""}`}
              >
                {" "}
                <p>{faq.answer}</p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default FAQ;
