// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCinyKJ0d8WbwTJskTCGEwSQB4IQro-YWQ",
  authDomain: "assignment-e5165.firebaseapp.com",
  databaseURL: "https://assignment-e5165-default-rtdb.firebaseio.com",
  projectId: "assignment-e5165",
  storageBucket: "assignment-e5165.appspot.com",
  messagingSenderId: "966019092049",
  appId: "1:966019092049:web:e48405bc6dfc80baa83270",
  measurementId: "G-VTEP81BP2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
