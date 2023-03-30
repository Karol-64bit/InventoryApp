// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// import * as firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcRs2SEHv09_UzDHtZChV8GF6sz7eSozI",
  authDomain: "fir-auth-16c30.firebaseapp.com",
  projectId: "fir-auth-16c30",
  storageBucket: "fir-auth-16c30.appspot.com",
  messagingSenderId: "28340530205",
  appId: "1:28340530205:web:f5f6f429c2326dd7f8eaf4"
};

// Initialize Firebase
// let app;
// if (firebaseConfig.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

// const auth = firebase.auth()

// export { auth };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, createUserWithEmailAndPassword }