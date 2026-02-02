import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDudyV9sVxf3IK5JXhJOpW71m9N-ApgsaA",
  authDomain: "cognitrack1.firebaseapp.com",
  projectId: "cognitrack1",
  storageBucket: "cognitrack1.firebasestorage.app",
  messagingSenderId: "207491057612",
  appId: "1:207491057612:web:f24d70c09e21d7346aff69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & DB
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
