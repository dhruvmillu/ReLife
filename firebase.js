// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIWEUrz_0w2_cwjDHmxaRUslMPjquY0lo",
  authDomain: "relife-4af65.firebaseapp.com",
  databaseURL: "https://relife-4af65-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "relife-4af65",
  storageBucket: "relife-4af65.appspot.com",
  messagingSenderId: "738275736459",
  appId: "1:738275736459:web:4c24597025ea308655cd8e",
  measurementId: "G-L67LESLRV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export {app}