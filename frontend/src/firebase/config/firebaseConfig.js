// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOQIDlhFQy7cw8622S40db6Xh4IfbLQsY",
  authDomain: "abarrotes-maxi.firebaseapp.com",
  projectId: "abarrotes-maxi",
  storageBucket: "abarrotes-maxi.firebasestorage.app",
  messagingSenderId: "890829884140",
  appId: "1:890829884140:web:331c27df2295c5c2fe33c9",
  measurementId: "G-K36EP2TWBR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
/* 👇 ESTA LÍNEA ES CLAVE */
export const db = getFirestore(app);