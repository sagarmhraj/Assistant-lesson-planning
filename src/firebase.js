// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcWSgXF9MKDHCNqHAf2fLfvBeO3PXhYZs",
  authDomain: "mcaproject-85763.firebaseapp.com",
  databaseURL: "https://mcaproject-85763-default-rtdb.firebaseio.com",
  projectId: "mcaproject-85763",
  storageBucket: "mcaproject-85763.appspot.com",
  messagingSenderId: "33640298237",
  appId: "1:33640298237:web:4f00823e339e12e09e3094",
  measurementId: "G-46J2L1TBND"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
