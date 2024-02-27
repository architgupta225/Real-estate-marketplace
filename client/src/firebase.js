// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-da9eb.firebaseapp.com",
  projectId: "mern-estate-da9eb",
  storageBucket: "mern-estate-da9eb.appspot.com",
  messagingSenderId: "84074312727",
  appId: "1:84074312727:web:ecc0fb689d2241f4cfd852"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);