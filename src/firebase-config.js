// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGaswwuBnITPZ1RoCETm7IKUv7CrjAfW8",
  authDomain: "train-with-me-1daa8.firebaseapp.com",
  projectId: "train-with-me-1daa8",
  storageBucket: "train-with-me-1daa8.appspot.com",
  messagingSenderId: "1023358057351",
  appId: "1:1023358057351:web:f33903d680d801de1c3122",
  measurementId: "G-VFXP8YG662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);