// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ab2f5.firebaseapp.com",
  projectId: "mern-blog-ab2f5",
  storageBucket: "mern-blog-ab2f5.appspot.com",
  messagingSenderId: "897417764767",
  appId: "1:897417764767:web:8c325a523fddc1515e27aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
