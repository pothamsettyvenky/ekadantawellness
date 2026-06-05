// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdcWjrZY5Oort8nBHK8TiG8XiyattUssg",
  authDomain: "ekadantha-55a4f.firebaseapp.com",
  projectId: "ekadantha-55a4f",
  storageBucket: "ekadantha-55a4f.firebasestorage.app",
  messagingSenderId: "668245367399",
  appId: "1:668245367399:web:df4fd001bf988cc0a052c2",
  measurementId: "G-2JYR74J17W",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
