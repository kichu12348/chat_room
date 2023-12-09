// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Dt2gifKtGkf1zos-HIMcrx3Rw-0MG0U",
  authDomain: "chatapp-ece73.firebaseapp.com",
  projectId: "chatapp-ece73",
  storageBucket: "chatapp-ece73.appspot.com",
  messagingSenderId: "136704700179",
  appId: "1:136704700179:web:4d22c51dc1ffa8cd85b4e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);