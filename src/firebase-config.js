import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-Qm_LLk19v6sR1ewasQ5v6zqAJLQ1ZRE",
    authDomain: "roomie-2024.firebaseapp.com",
    databaseURL: "https://roomie-2024-default-rtdb.firebaseio.com",
    projectId: "roomie-2024",
    storageBucket: "roomie-2024.appspot.com",
    messagingSenderId: "993286279870",
    appId: "1:993286279870:web:47d7cdf18f77c3e53e84ef"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log('firebase auth is running!');
export const db = getFirestore(app);
console.log('firestore is running!');
