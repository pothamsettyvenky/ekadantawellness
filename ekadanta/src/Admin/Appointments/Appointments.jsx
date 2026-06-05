import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../../firebase/config";
import AdminLayout from "../Layout/AdminLayout"

import "./Appointments.css";

function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(data);

    } catch (error) {

      console.error(
        "Error loading appointments:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <AdminLayout>
        <div className="appointments-container">
          <h2 className="loading-text">
            Loading Appointments...
          </h2>
        </div>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <div className="appointments-container">

        <div className="appointments-header">

          <h1 className="appointments-title">
            Appointments
          </h1>

          <button
            className="refresh-btn"
            onClick={fetchAppointments}
          >
            Refresh
          </button>

        </div>

        <div className="table-wrapper">

          <table className="appointments-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

           <tbody>
  {appointments.length === 0 ? (
    <tr>
      <td
        colSpan="10"
        style={{
          textAlign: "center",
          padding: "40px"
        }}
      >
        No Appointments Found
      </td>
    </tr>
  ) : (
    appointments.map((appointment) => {
      return (
        <tr key={appointment.id}>
          <td>{appointment.name || "-"}</td>

          <td>{appointment.email || "-"}</td>

          <td>{appointment.phone || "-"}</td>

          <td>{appointment.service || "-"}</td>

          <td>{appointment.date || "-"}</td>

          <td>{appointment.slot || "-"}</td>

          <td>{appointment.packageType || "-"}</td>

          <td>₹{appointment.amount || 0}</td>

          <td>
            <span
              className={
                appointment.status === "Booked"
                  ? "status-booked"
                  : appointment.status === "Cancelled"
                  ? "status-cancelled"
                  : "status-pending"
              }
            >
              {appointment.status || "Pending"}
            </span>
          </td>

          <td>
            
          </td>
        </tr>
      );
    })
  )}
</tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Appointments;