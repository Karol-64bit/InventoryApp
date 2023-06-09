import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcRs2SEHv09_UzDHtZChV8GF6sz7eSozI",
  authDomain: "fir-auth-16c30.firebaseapp.com",
  projectId: "fir-auth-16c30",
  storageBucket: "fir-auth-16c30.appspot.com",
  messagingSenderId: "28340530205",
  appId: "1:28340530205:web:f5f6f429c2326dd7f8eaf4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, auth, db }