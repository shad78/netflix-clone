import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQ9v3lEyyzGoqUdm7ZHco-McAjFFnfNqg",
  authDomain: "netflix-clone-1a14a.firebaseapp.com",
  projectId: "netflix-clone-1a14a",
  storageBucket: "netflix-clone-1a14a.appspot.com",
  messagingSenderId: "110269958111",
  appId: "1:110269958111:web:8d87434c1d328e5da8a66a",
  measurementId: "G-46N3S9DR64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
