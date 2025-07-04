// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfX-iR02dinbfztgawuVNitMIz6i8_GiM",
  authDomain: "signinform-b731d.firebaseapp.com",
  projectId: "signinform-b731d",
  storageBucket: "signinform-b731d.appspot.com",
  messagingSenderId: "96506574126",
  appId: "1:96506574126:web:38a4c3b4d0d6109117b6bf",
  measurementId: "G-MCWVGLR27R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
