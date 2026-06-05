import {
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";

import { db } from "./config";

export const createAppointment = async (appointmentData) => {
  return await addDoc(
    collection(db, "appointments"),
    {
      ...appointmentData,
      paymentStatus: "Pending",
      status: "Pending",
      createdAt: Timestamp.now()
    }
  );
};