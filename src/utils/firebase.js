// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogwebsite-413906.firebaseapp.com",
  projectId: "blogwebsite-413906",
  storageBucket: "blogwebsite-413906.appspot.com",
  messagingSenderId: "466264806706",
  appId: "1:466264806706:web:ff8ccfc5f803dbd07bf32b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);