import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSykIBzWMRRiW19vqkOcakR0Ltcs61rfs",
  authDomain: "cover-letter-genie.firebaseapp.com",
  projectId: "cover-letter-genie",
  storageBucket: "cover-letter-genie.appspot.com",
  messagingSenderId: "961145863904",
  appId: "1:961145863904:web:86daa1c3a52cff475d5a85",
  measurementId: "G-DE1MHS1W3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
