import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDLP0mUu_Uogpk432vWikjKEnnzztkVUs",
  authDomain: "learnlingo-7165b.firebaseapp.com",
  projectId: "learnlingo-7165b",
  storageBucket: "learnlingo-7165b.firebasestorage.app",
  messagingSenderId: "223073118670",
  appId: "1:223073118670:web:beb59a46de5589eaada39f",
  measurementId: "G-3H48YPEG6W",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;
