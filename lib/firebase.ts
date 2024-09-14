// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfI-f8XpTtUVDku-J_CsSxqfB4uXQIpIg",
  authDomain: "talabayt313.firebaseapp.com",
  projectId: "talabayt313",
  storageBucket: "talabayt313.appspot.com",
  messagingSenderId: "747324726887",
  appId: "1:747324726887:web:c021ca9c05e36429e87ec2",
  measurementId: "G-PG6MVF2DJY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
