// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config (from Firebase Console → Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyD-PoWFl6-hf4gzH9zYQ65ojmIavaU7qIk",
  authDomain: "dialer-a3cc3.firebaseapp.com",
  projectId: "dialer-a3cc3",
  storageBucket: "dialer-a3cc3.firebasestorage.app",
  messagingSenderId: "292240185425",
  appId: "1:292240185425:web:dde55e7577fd4d566a8070",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication & Firestore Database
export const auth = getAuth(app);
export const db = getFirestore(app);
