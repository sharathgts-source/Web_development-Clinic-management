// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsRio6_HznhDKy4rdHD6ZOrVOs-SH90H4",
  authDomain: "clinic-direction-gts.firebaseapp.com",
  projectId: "clinic-direction-gts",
  storageBucket: "clinic-direction-gts.firebasestorage.app",
  messagingSenderId: "704436307029",
  appId: "1:704436307029:web:a2812db5b0a816b1c240dc",
  measurementId: "G-J5L6RE0CQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);