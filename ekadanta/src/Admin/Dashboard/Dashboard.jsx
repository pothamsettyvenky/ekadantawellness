import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";
import AdminLayout from "../Layout/AdminLayout";
import { db } from "../../firebase/config";

import "./Dashboard.css";

function Dashboard() {

  const [appointments, setAppointments] = useState(0);
  const [patients, setPatients] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

  try {

    const appointmentSnapshot =
      await getDocs(
        collection(db, "appointments")
      );

    let totalRevenue = 0;
    let totalPatients = 0;

    appointmentSnapshot.docs.forEach(doc => {

      const data = doc.data();

      if (
        data.paymentStatus === "paid"
      ) {

        totalRevenue += Number(
          data.amount || 0
        );

        totalPatients++;

      }

    });

    setAppointments(
      appointmentSnapshot.size
    );

    setPatients(
      totalPatients
    );

    setRevenue(
      totalRevenue
    );

  } catch (error) {

    console.error(error);

  }

};

  return (
<AdminLayout>
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Doctor Dashboard
      </h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Appointments</h3>
          <h2>{appointments}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Patients</h3>
          <h2>{patients}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹{revenue}</h2>
        </div>

      </div>

    </div>
</AdminLayout>
  );

}

export default Dashboard;