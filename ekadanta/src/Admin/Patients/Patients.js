import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/config";
import AdminLayout from "../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState([]);
const navigate = useNavigate();
  useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "appointments"),
    (snapshot) => {

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const paidPatients = data.filter(
        patient =>
          patient.paymentStatus &&
          patient.paymentStatus.toLowerCase() === "paid"
      );

      setPatients(paidPatients);

    }
  );

  return () => unsubscribe();

}, []);
  return (
    <AdminLayout>
      <div className="patients-container">
        <div className="patients-header">
          <h1>Patients</h1>

          <span>Total Patients: {patients.length}</span>
        </div>

        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No Patients Found
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>

                    <td>{patient.email}</td>

                    <td>{patient.phone}</td>

                    <td>{patient.age}</td>

                    <td>{patient.gender}</td>

                    <td>
                    <div className="action-buttons">

              <button
  className="notes-btn"
  onClick={() =>
    navigate(`/admin/patient/${patient.id}`)
  }
>
  Open Patient
</button>
            </div>
                    
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Patients;
