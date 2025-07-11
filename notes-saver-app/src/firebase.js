// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvP23MKKB11rxEEoKplexc1QRbf5Ejlts",
  authDomain: "myfirst-a3086.firebaseapp.com",
  projectId: "myfirst-a3086",
  storageBucket: "myfirst-a3086.firebasestorage.app",
  messagingSenderId: "788733641603",
  appId: "1:788733641603:web:f99ed9a98d212604d8ecb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);