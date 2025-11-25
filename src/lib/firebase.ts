// src/lib/firebase.ts   ← nama file HARUS firebase.ts (bukan Firebase.ts)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// GANTI DENGAN CONFIG FIREBASE KAMU SENDIRI!
const firebaseConfig = {
  apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "project-kamu.firebaseapp.com",
  projectId: "project-kamu",
  storageBucket: "project-kamu.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);