import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage
const firebaseConfig = {
  apiKey: "AIzaSyD-PoWFl6-hf4gzH9zYQ65ojmIavaU7qIk",
  authDomain: "dialer-a3cc3.firebaseapp.com",
  projectId: "dialer-a3cc3",
  storageBucket: "dialer-a3cc3.firebasestorage.app",
  messagingSenderId: "292240185425",
  appId: "1:292240185425:web:dde55e7577fd4d566a8070"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize Firebase Storage
//export { db, collection, addDoc, getDocs };
export { db, collection, addDoc, getDocs, doc, getDoc, updateDoc, storage };