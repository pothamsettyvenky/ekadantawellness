import React, { useState, useEffect } from "react";
import "./BookAppointment.css";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../../firebase/config";

function BookAppointment() {
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const [customService, setCustomService] = useState("");

  const [slots, setSlots] = useState([]);

  const [formData, setFormData] = useState({
    packageType: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    service: "",
    address: "",
    date: "",
    slot: "",
    notes: "",
  });

  const services = [
    "Paediatric Care",
    "Geriatric Care",
    "ADHD",
    "Autism",
    "Respiratory Complaints",
    "Gastric Complaints",
    "Rectal Issues",
    "Lifestyle Diseases",
    "Bone & Joint Health",
    "Skin Complaints",
    "PCOD",
    "Varicose Veins",
    "Menopausal Syndrome",
    "Hormonal Issues",
    "Stress",
    "Migraine",
    "Autoimmune Disorders",
    "Warts",
    "General Consultation",
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "slots"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSlots(data);
      },
      (error) => {
        console.error(error);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleServiceSelect = (e) => {
    const service = e.target.value;

    if (service && !selectedServices.includes(service)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter((item) => item !== service));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const appointmentData = {

      ...formData,

      services: selectedServices,

      otherService: customService

    };

    const orderResponse =
      await fetch(

        "https://ekadantawellness-backend.onrender.com/api/payment/create-order",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            packageType:
              formData.packageType

          })

        }

      );

    const orderData =
      await orderResponse.json();

    if (
      !orderData.success
    ) {

      throw new Error(
        "Order Creation Failed"
      );

    }

    const options = {

      key:
        "rzp_test_T0ZrtLYCscwYj8",

      amount:
        orderData.order.amount,

      currency:
        "INR",

      name:
        "Ekadantha Wellness",

      description:
        "Consultation Booking",

      order_id:
        orderData.order.id,

      prefill: {

        name:
          formData.name,

        email:
          formData.email,

        contact:
          formData.phone

      },

      theme: {

        color:
          "#2f6f5f"

      },

      handler:
        async function (
          response
        ) {

          try {

            const verifyResponse =
              await fetch(

                "https://ekadantawellness-backend.onrender.com/api/payment/verify-payment",

                {

                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body:
                    JSON.stringify({

                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,

                      appointmentData

                    })

                }

              );

            const verifyData =
              await verifyResponse.json();

            if (
              verifyData.success
            ) {

              alert(
                "Payment Successful. Appointment Confirmed."
              );

              setFormData({

                packageType:
                  "",

                name:
                  "",

                email:
                  "",

                phone:
                  "",

                age:
                  "",

                gender:
                  "",

                address:
                  "",

                date:
                  "",

                slot:
                  "",

                notes:
                  ""

              });

              setSelectedServices(
                []
              );

              setCustomService(
                ""
              );

            } else {

              alert(
                "Payment Verification Failed"
              );

            }

          } catch (
            error
          ) {

            console.error(
              error
            );

            alert(
              "Verification Failed"
            );

          }

        }

    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  } catch (error) {

    console.error(
      error
    );

    alert(
      error.message
    );

  } finally {

    setLoading(false);

  }

};
  };

  return (
    <section className="book-appointment">
      <div className="appointment-container">
        <div className="appointment-header">
          <p>ONLINE CONSULTATION</p>

          <h1>Book Your Appointment</h1>
        </div>
        <div className="package-details-section">
          <h2>Consultation Packages</h2>

          <div className="package-details-grid">
            <div className="package-info-card">
              <h3>Without Medication</h3>

              <div className="price">₹1499</div>

              <ul>
                <li>✓ Initial Consultation (45–60 Minutes)</li>

                <li>✓ Detailed Case Evaluation</li>

                <li>✓ Personalized Treatment Plan</li>

                <li>✓ 1 Complimentary Follow-Up Consultation</li>
                <li>✓ Reminder Email Sent After 15 Days</li>
              </ul>
            </div>

            <div className="package-info-card featured">
              <h3>With Medication</h3>

              <div className="price">₹2999</div>

              <ul>
                <li>✓ Initial Consultation (45–60 Minutes)</li>

                <li>✓ Detailed Case Evaluation</li>

                <li>✓ Personalized Treatment Plan</li>

                <li>✓ Homeopathic Medicines Included</li>

                <li>✓ 1 Follow-Up Consultation After 15 Days</li>

                <li>✓ Shipping Across India</li>
              </ul>
            </div>
          </div>

          <div className="followup-note">
            <h4>Follow-Up Packages</h4>

            <p>Follow-up consultations are conducted every 15 days.</p>

            <p>Follow-Up Package (Without Medication): ₹1199 per month</p>

            <p>Follow-Up Package (With Medication): ₹2499 per month</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="package-box">
            <h3>Select Package</h3>

            <label>
              <input
                type="radio"
                name="packageType"
                value="Without Medication"
                checked={formData.packageType === "Without Medication"}
                onChange={handleChange}
                required
              />
              Without Medication ₹1499 (1 Consultation + 1 Follow-Up)
            </label>

            <label>
              <input
                type="radio"
                name="packageType"
                value="With Medication"
                checked={formData.packageType === "With Medication"}
                onChange={handleChange}
                required
              />
              With Medication ₹2999 (1 Consultation + 1 Follow-Up + Medicines)
            </label>
          </div>

          <div className="appointment-grid">
            <div className="appointment-card">
              <h3>Patient Details</h3>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div className="appointment-card">
              <h3>Appointment Details</h3>

              <label className="service-label">Select Services</label>

              <select onChange={handleServiceSelect} defaultValue="">
                <option value="">Select Service</option>

                {services.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="selected-services">
                {selectedServices.map((service) => (
                  <div key={service} className="service-tag">
                    {service}

                    <span onClick={() => removeService(service)}>✕</span>
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Other Service (Optional)"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <select
                name="slot"
                value={formData.slot}
                onChange={handleChange}
                required
              >
                <option value="">Select Slot</option>

                {slots
                  .filter(
                    (slot) =>
                      slot.date === formData.date && slot.available === true,
                  )
                  .map((slot) => (
                    <option key={slot.id} value={slot.time}>
                      {slot.time}
                    </option>
                  ))}
              </select>

              <textarea
                rows="4"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />

              <textarea
                rows="4"
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="book-btn" disabled={loading} type="submit">
            {loading ? "Please Wait..." : "Proceed To Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookAppointment;
