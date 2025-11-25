// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqW3u9vK7d8jF5kL9pQ2xR7tY8uI6oP5e",        // ganti kalau mau pakai project sendiri
  authDomain: "kliniksehat-reservasi.firebaseapp.com",
  projectId: "kliniksehat-reservasi",
  storageBucket: "kliniksehat-reservasi.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);