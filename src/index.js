import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-Qm_LLk19v6sR1ewasQ5v6zqAJLQ1ZRE",
    authDomain: "roomie-2024.firebaseapp.com",
    databaseURL: "https://roomie-2024-default-rtdb.firebaseio.com",
    projectId: "roomie-2024",
    storageBucket: "roomie-2024.appspot.com",
    messagingSenderId: "993286279870",
    appId: "1:993286279870:web:47d7cdf18f77c3e53e84ef"
  };

//Initialize firebase
const app = intializeApp(firebaseConfig);

const db = getFirestore(app);


const snapshot = await getDocs(collection(db, 'groups'));
snapshot