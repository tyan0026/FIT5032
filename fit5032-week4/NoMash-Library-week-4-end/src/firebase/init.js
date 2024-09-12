// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkMJP-rsyUL-XYBLts1P88tzosQkv9hxI",
  authDomain: "week7---tianning.firebaseapp.com",
  projectId: "week7---tianning",
  storageBucket: "week7---tianning.appspot.com",
  messagingSenderId: "587289111074",
  appId: "1:587289111074:web:55f126b94bf7b99a21787b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db