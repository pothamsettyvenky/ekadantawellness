import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp
} from "firebase/firestore";

import { db } from "../../firebase/config";
import AdminLayout from "../Layout/AdminLayout";
import "./Slots.css";

function Slots() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "slots")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setSlots(data);

    } catch (error) {

      console.error(error);

    }

  };

  const addSlot = async (e) => {

    e.preventDefault();

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    try {

      await addDoc(
        collection(db, "slots"),
        {
          date,
          time,
          available: true,
          createdAt: Timestamp.now()
        }
      );

      setDate("");
      setTime("");

      loadSlots();

    } catch (error) {

      console.error(error);

    }

  };

  const deleteSlot = async (id) => {

    try {

      await deleteDoc(
        doc(db, "slots", id)
      );

      loadSlots();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <AdminLayout>

      <div className="slots-container">

        <h1>Manage Slots</h1>

        <form
          className="slot-form"
          onSubmit={addSlot}
        >

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

          <button type="submit">
            Add Slot
          </button>

        </form>

        <div className="slots-table-wrapper">

          <table className="slots-table">

            <thead>

              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Available</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {slots.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center"
                    }}
                  >
                    No Slots Found
                  </td>

                </tr>

              ) : (

                slots.map((slot) => (

                  <tr key={slot.id}>

                    <td>{slot.date}</td>

                    <td>{slot.time}</td>

                    <td>
                      {slot.available
                        ? "Available"
                        : "Booked"}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteSlot(slot.id)
                        }
                      >
                        Delete
                      </button>

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

export default Slots;