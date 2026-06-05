import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { useParams } from "react-router-dom";

import { db } from "../../firebase/config";
import AdminLayout from "../Layout/AdminLayout";

import "./PatientDetails.css";

function PatientDetails() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [doctorNotes, setDoctorNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 2;
  const [noteForm, setNoteForm] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
    dietPlan: "",
    notes: "",
    followUpDate: "",
  });

//   useEffect(() => {
//     loadPatient();
//   }, [id]);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, "doctorNotes"),
      where("patientId", "==", id),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedData = data.sort(
        (a, b) => b.createdAt?.seconds - a.createdAt?.seconds,
      );

      setDoctorNotes(sortedData);
      setCurrentPage(1);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {

  const loadPatient = async () => {

    try {

      const docRef = doc(
        db,
        "appointments",
        id
      );

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {

        setPatient({
          id: snapshot.id,
          ...snapshot.data(),
        });

      }

    } catch (error) {

      console.error(error);

    }

  };

  loadPatient();

}, [id]);

  const handleNoteChange = (e) => {
    setNoteForm({
      ...noteForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveDoctorNote = async () => {
    try {
      await addDoc(collection(db, "doctorNotes"), {
        patientId: id,

        patientName: patient?.name || "",
patientEmail: patient?.email || "",
patientPhone: patient?.phone || "",

        symptoms: noteForm.symptoms,
        diagnosis: noteForm.diagnosis,
        prescription: noteForm.prescription,
        dietPlan: noteForm.dietPlan,
        notes: noteForm.notes,
        followUpDate: noteForm.followUpDate,

        createdAt: Timestamp.now(),
      });

      alert("Doctor Notes Saved");

      setShowModal(false);

      setNoteForm({
        symptoms: "",
        diagnosis: "",
        prescription: "",
        dietPlan: "",
        notes: "",
        followUpDate: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed To Save");
    }
  };

  if (!patient) {
    return (
      <AdminLayout>
        <div className="patient-details">Loading...</div>
      </AdminLayout>
    );
  }
  const indexOfLastNote = currentPage * notesPerPage;

  const indexOfFirstNote = indexOfLastNote - notesPerPage;

  const currentNotes = doctorNotes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(doctorNotes.length / notesPerPage);
  return (
    <AdminLayout>
      <div className="patient-details">
        <div className="patient-card">
          <h2>Patient Information</h2>

          <p>
            <strong>Name:</strong> {patient.name}
          </p>

          <p>
            <strong>Email:</strong> {patient.email}
          </p>

          <p>
            <strong>Phone:</strong> {patient.phone}
          </p>

          <p>
            <strong>Age:</strong> {patient.age}
          </p>

          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>

          <p>
            <strong>Service:</strong> {patient.service}
          </p>

          <p>
            <strong>Package:</strong> {patient.packageType}
          </p>

          <button className="add-note-btn" onClick={() => setShowModal(true)}>
            Add Notes
          </button>
        </div>

        <div className="notes-history-card">
          {doctorNotes.length > notesPerPage && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
          <h2>Previous Notes</h2>

          {doctorNotes.length === 0 ? (
            <p>No Notes Available</p>
          ) : (
            currentNotes.map((note) => (
              <div key={note.id} className="note-item">
                <h4>
                  Consultation Date:{" "}
                  {note.createdAt?.toDate
                    ? note.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </h4>
                <p>
                  <strong>Symptoms:</strong>
                  {note.symptoms}
                </p>

                <p>
                  <strong>Diagnosis:</strong>
                  {note.diagnosis}
                </p>

                <p>
                  <strong>Prescription:</strong>
                  {note.prescription}
                </p>

                <p>
                  <strong>Diet Plan:</strong>
                  {note.dietPlan}
                </p>

                <p>
                  <strong>Additional Notes:</strong>
                  {note.notes}
                </p>

                <p>
                  <strong>Follow Up:</strong>
                  {note.followUpDate}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Doctor Notes</h2>

            <textarea
              name="symptoms"
              placeholder="Symptoms"
              value={noteForm.symptoms}
              onChange={handleNoteChange}
            />

            <textarea
              name="diagnosis"
              placeholder="Diagnosis"
              value={noteForm.diagnosis}
              onChange={handleNoteChange}
            />

            <textarea
              name="prescription"
              placeholder="Prescription"
              value={noteForm.prescription}
              onChange={handleNoteChange}
            />

            <textarea
              name="dietPlan"
              placeholder="Diet Plan"
              value={noteForm.dietPlan}
              onChange={handleNoteChange}
            />

            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={noteForm.notes}
              onChange={handleNoteChange}
            />

            <input
              type="date"
              name="followUpDate"
              value={noteForm.followUpDate}
              onChange={handleNoteChange}
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={saveDoctorNote}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default PatientDetails;
