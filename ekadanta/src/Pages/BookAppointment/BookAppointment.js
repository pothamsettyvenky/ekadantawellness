import React, { useState, useEffect } from "react";
import "./BookAppointment.css";

import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot
} from "firebase/firestore";

import { db } from "../../firebase/config";

function BookAppointment() {

  const [loading, setLoading] = useState(false);

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
    notes: ""
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
    "General Consultation"
  ];

 useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "slots"),
    (snapshot) => {

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSlots(data);

    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();

}, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const amount =
        formData.packageType === "With Medication"
          ? 2999
          : 1499;

      const appointmentRef = await addDoc(
        collection(db, "appointments"),
        {
          ...formData,
          amount,
          paymentStatus: "Pending",
          status: "Waiting For Payment",
          createdAt: Timestamp.now()
        }
      );

      await addDoc(
        collection(db, "patients"),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          address: formData.address,
          createdAt: Timestamp.now()
        }
      );

      console.log(
        "Appointment Created:",
        appointmentRef.id
      );

      alert("Appointment Saved Successfully");

      setFormData({
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
        notes: ""
      });

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="book-appointment">

      <div className="appointment-container">

        <div className="appointment-header">

          <p>ONLINE CONSULTATION</p>

          <h1>Book Your Appointment</h1>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="package-box">

            <h3>Select Package</h3>

            <label>

              <input
                type="radio"
                name="packageType"
                value="Without Medication"
                checked={
                  formData.packageType ===
                  "Without Medication"
                }
                onChange={handleChange}
                required
              />

              Without Medication ₹1499

            </label>

            <label>

              <input
                type="radio"
                name="packageType"
                value="With Medication"
                checked={
                  formData.packageType ===
                  "With Medication"
                }
                onChange={handleChange}
                required
              />

              With Medication ₹2999

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
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <div className="appointment-card">

              <h3>Appointment Details</h3>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Service
                </option>

                {services.map((item, index) => (

                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

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

  <option value="">
    Select Slot
  </option>

  {slots
    .filter(
      slot =>
        slot.date === formData.date &&
        slot.available === true
    )
    .map(slot => (

      <option
        key={slot.id}
        value={slot.time}
      >
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

          <button
            className="book-btn"
            disabled={loading}
            type="submit"
          >
            {
              loading
                ? "Please Wait..."
                : "Proceed To Booking"
            }
          </button>

        </form>

      </div>

    </section>

  );

}

export default BookAppointment;