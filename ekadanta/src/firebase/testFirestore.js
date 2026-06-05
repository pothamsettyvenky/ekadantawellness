// src/firebase/testFirestore.js

import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

export const testFirestore = async () => {
  try {
    await addDoc(collection(db, "patients"), {
      name: "Test Patient",
      email: "test@test.com"
    });

    console.log("Firestore Connected");
  } catch (error) {
    console.error(error);
  }
};