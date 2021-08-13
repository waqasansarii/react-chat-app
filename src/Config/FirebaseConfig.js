import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBf1f6V4vQMyv7utxFR0bXe5j0YKkkPGHg",
  authDomain: "react-chat-app-f2045.firebaseapp.com",
  projectId: "react-chat-app-f2045",
  storageBucket: "react-chat-app-f2045.appspot.com",
  messagingSenderId: "940387825967",
  appId: "1:940387825967:web:ad5806d0060bcfe89ac9da",
  measurementId: "G-0XQVGSYMK4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
