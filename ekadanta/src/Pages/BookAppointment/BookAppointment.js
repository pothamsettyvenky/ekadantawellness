  import React, { useState, useEffect } from "react";
  import "./BookAppointment.css";

  import {
    collection,
    onSnapshot
  } from "firebase/firestore";

  import { db } from "../../firebase/config";

  function BookAppointment() {
    const openPopup = (
    type,
    title,
    message
  ) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMessage(message);
    setShowPopup(true);
  };
    const [showPopup, setShowPopup] =
    useState(false);

  const [popupTitle, setPopupTitle] =
    useState("");

  const [popupMessage, setPopupMessage] =
    useState("");

  const [popupType, setPopupType] =
    useState("");
    const [followupStatus,
    setFollowupStatus] =
    useState(null);

  const [
    originalAppointmentId,
    setOriginalAppointmentId
  ] = useState("");

  const [
    checkingEligibility,
    setCheckingEligibility
  ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    const [customService, setCustomService] = useState("");

    const [slots, setSlots] = useState([]);

    const [formData, setFormData] = useState({
    appointmentType: "initial",
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
    slotTime: "",
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
  const checkEligibility =
    async () => {

      try {

        setCheckingEligibility(
          true
        );

        const response =
          await fetch(

            "https://ekadantawellness-backend.onrender.com/api/followup/check-followup",

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({

                  email:
                    formData.email

                })

            }

          );

        const data = await response.json();

console.log("FOLLOWUP RESPONSE:", data);

setFollowupStatus(data.status);
          
  setFollowupStatus(data.status);
        if (data.patientData) {
    setFormData((prev) => ({
      ...prev,

      name:
        data.patientData.name,

      phone:
        data.patientData.phone,

      age:
        data.patientData.age,

      gender:
        data.patientData.gender
    }));
  }

        if (
          data.status ===
          "free_followup"
        ) {

          setOriginalAppointmentId(
            data.appointmentId
          );

      openPopup(
    "free",
    "🎉 Complimentary Follow-Up Available",
    "We found an active consultation associated with this email address. You are eligible for 1 complimentary follow-up consultation."
  );

        } else if (
          data.status ===
          "paid_followup"
        ) {

      openPopup(
    "paid",
    "Follow-Up Package Required",
    "Your complimentary follow-up consultation has already been utilized. Please select a follow-up package below to continue."
  );

        } else {

         openPopup(
    "new",
    "No Previous Consultation Found",
    "We could not find any previous consultation associated with this email address. Please proceed with a new consultation booking."
  );

  setFollowupStatus(null);
  setOriginalAppointmentId("");

  setFormData((prev) => ({
    ...prev,
    appointmentType: "initial"
  }));

        }

      } catch (error) {

        console.error(error);

      } finally {

        setCheckingEligibility(
          false
        );

      }

    };
    const handleChange = (e) => {

  const { name, value } = e.target;

  if (name === "appointmentType") {

    setFollowupStatus(null);
    setOriginalAppointmentId("");

  }

  setFormData({
    ...formData,
    [name]: value
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
    if (
    formData.appointmentType === "followup" &&
    !followupStatus
  ) {
    alert(
      "Please check eligibility first."
    );
    return;
  }
    if (
    formData.appointmentType === "followup" &&
    followupStatus === "free_followup"
  ) {
    try {

      setLoading(true);

      const response = await fetch(
        "https://ekadantawellness-backend.onrender.com/api/payment/book-free-followup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            originalAppointmentId,
            appointmentData: {
              ...formData,
              services: selectedServices,
              otherService: customService,
              
            }
          })
        }
      );

      const data = await response.json();
      

      if (data.success) {

      alert(
  "Free Follow-Up Booked Successfully"
);

setFormData({
  appointmentType: "initial",
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

setSelectedServices([]);
setCustomService("");
setFollowupStatus(null);
setOriginalAppointmentId("");
setShowPopup(false);

        return;
      }

    } catch (error) {

      console.error(error);

      alert("Booking Failed");

      return;

    } finally {

      setLoading(false);

    }
  }

    try {

      setLoading(true);

      const packageAmounts = {
    "Without Medication": 1499,
    "With Medication": 2999,
    "Follow-Up Without Medication": 1199,
    "Follow-Up With Medication": 2499
  };

  const appointmentData = {
    ...formData,
    services: selectedServices,
    otherService: customService,
    amount: packageAmounts[formData.packageType] || 0,
  
    
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
          "rzp_test_T0oQrwW2TTRH5W",

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

          contact: String(formData.phone)

        },
        readonly: {
    contact: false,
    email: false
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
    appointmentType: "initial",
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

                setSelectedServices(
                  []
                );

                setCustomService(
                  ""
                );
                setFollowupStatus(null);
setOriginalAppointmentId("");
setShowPopup(false);

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
  console.log(
    "Order Data:",
    orderData
  );

  console.log(
    "Order:",
    orderData.order
  );

  console.log(
    "Order ID:",
    orderData.order?.id
  );

  console.log(
    "Amount:",
    orderData.order?.amount
  );
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
          <div className="selection-section">

  <h3>Appointment Type</h3>

  <div className="selection-cards">

    <label
      className={`selection-card ${
        formData.appointmentType === "initial"
          ? "active"
          : ""
      }`}
    >
      <input
        type="radio"
        name="appointmentType"
        value="initial"
        checked={
          formData.appointmentType === "initial"
        }
        onChange={handleChange}
      />

      <div>
        <h4>New Consultation</h4>
        <p>First consultation with doctor</p>
      </div>

    </label>

    <label
      className={`selection-card ${
        formData.appointmentType === "followup"
          ? "active"
          : ""
      }`}
    >
      <input
        type="radio"
        name="appointmentType"
        value="followup"
        checked={
          formData.appointmentType === "followup"
        }
        onChange={handleChange}
      />

      <div>
        <h4>Follow-Up Consultation</h4>
        <p>Existing patient review</p>
      </div>

    </label>

  </div>

</div>
            {formData.appointmentType === "followup" && (
    <div style={{ marginBottom: "20px" }}>
<div className="followup-check">

  <input
    type="email"
    name="email"
    placeholder="Enter your email address"
    value={formData.email}
    onChange={handleChange}
    readOnly={!!followupStatus}
    required
  />

  <button
    type="button"
    onClick={checkEligibility}
    disabled={!!followupStatus}
  >
    {checkingEligibility
      ? "Verifying..."
      : followupStatus
      ? "✓ Verified"
      : "Verify Eligibility"}
  </button>

</div>
    </div>
  )}
  {formData.appointmentType === "initial" && (
    <>
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
        />
        With Medication ₹2999
      </label>
    </>
  )}
  {followupStatus === "paid_followup" && (
    <>
      <h3>Follow-Up Packages</h3>

      <label>
        <input
          type="radio"
          name="packageType"
          value="Follow-Up Without Medication"
          checked={
            formData.packageType ===
            "Follow-Up Without Medication"
          }
          onChange={handleChange}
        />
        Follow-Up Without Medication ₹1199
      </label>

      <label>
        <input
          type="radio"
          name="packageType"
          value="Follow-Up With Medication"
          checked={
            formData.packageType ===
            "Follow-Up With Medication"
          }
          onChange={handleChange}
        />
        Follow-Up With Medication ₹2499
      </label>
    </>
  )}
  {followupStatus === "free_followup" && (
    <div
      style={{
        background: "#e8fff0",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "8px"
      }}
    >
      <div>
    <h4>
      ✅ Complimentary Follow-Up Confirmed
    </h4>

    <p>
      Your patient details have been retrieved successfully.
    </p>

    <p>
      Please select your preferred date and time to complete your booking.
    </p>
  </div>
    </div>
  )}
            <div className="appointment-grid">
              <div className="appointment-card">
                <h3>Patient Details</h3>

                <input
    type="text"
    name="name"
    readOnly={
      formData.appointmentType === "followup"
    }
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                {formData.appointmentType === "initial" && (
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  )}

                <input
    type="tel"
    name="phone"
    readOnly={
      formData.appointmentType === "followup"
    }
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              <input
    type="number"
    name="age"
    readOnly={
      formData.appointmentType === "followup"
    }
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

              <select
    name="gender"
    disabled={
      formData.appointmentType === "followup"
    }
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
  value={formData.slot}
  onChange={(e) => {
    const selectedSlot =
      slots.find(
        (slot) =>
          slot.id === e.target.value
      );

    setFormData({
      ...formData,
      slot: selectedSlot.id,
      slotTime: selectedSlot.time
    });
  }}
>
  <option value="">
    Select Slot
  </option>

  {slots
    .filter(
      (slot) =>
        slot.date === formData.date &&
        slot.available === true
    )
    .map((slot) => (
      <option
        key={slot.id}
        value={slot.id}
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
    {loading
      ? "Please Wait..."
      : followupStatus === "free_followup"
      ? "Book Free Follow-Up"
      : "Proceed To Booking"}
  </button>
          </form>
        </div>
        {showPopup && (
    <div className="popup-overlay">
      <div className="popup-modal">

        <div className="popup-header">
          <h2>{popupTitle}</h2>
        </div>

        <div className="popup-body">
          <p>{popupMessage}</p>
        </div>

        <div className="popup-footer">

          {popupType === "free" && (
            <button
              className="popup-btn primary"
              onClick={() =>
                setShowPopup(false)
              }
            >
             Continue
            </button>
          )}

          {popupType === "paid" && (
            <button
              className="popup-btn primary"
              onClick={() =>
                setShowPopup(false)
              }
            >
              Select Package
            </button>
          )}

          {popupType === "new" && (
            <button
              className="popup-btn primary"
              onClick={() =>
                setShowPopup(false)
              }
            >
              Continue
            </button>
          )}

          <button
            className="popup-btn secondary"
            onClick={() =>
              setShowPopup(false)
            }
          >
            Close
          </button>

        </div>

      </div>
    </div>
  )}
      </section>
    );
  }

  export default BookAppointment;
