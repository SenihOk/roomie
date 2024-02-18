// Import the necessary Firebase modules
import firebase from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase-config';

// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyC-Qm_LLk19v6sR1ewasQ5v6zqAJLQ1ZRE",
//     authDomain: "roomie-2024.firebaseapp.com",
//     databaseURL: "https://roomie-2024-default-rtdb.firebaseio.com",
//     projectId: "roomie-2024",
//     storageBucket: "roomie-2024.appspot.com",
//     messagingSenderId: "993286279870",
//     appId: "1:993286279870:web:47d7cdf18f77c3e53e84ef"
// };

//Initialize firebase
// const app = firebase.initializeApp(firebaseConfig);

// const db = getFirestore(app);

// const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    // const loginElements = document.querySelectorAll(".login-signup");
    // const accountElements = document.querySelectorAll(".account");
    if (user) {
        addUserToRoom(user.uid);
        console.log('user is logged in', user.email);
        
    } else {
        console.log('user is not logged in');
        accountElements.forEach(element => {
            element.style.display = 'block';
        });
        // document.getElementById('logout').style.display = 'none';
        // document.getElementById('username').style.display = 'none';
        // User is signed out
    }
  });

// Get the roomID from the URL

async function addUserToRoom(uid) {
    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/') + 1);

    // Get a reference to the Firestore collection
    const roomsCollection = db.collection('rooms');

    // Add the user ID to the users array in the room document
    const roomRef = doc(roomsCollection, roomID);
    const snapshot = await getDoc(roomRef);
    if(snapshot.exists()) {
        if(snapshot.data.items.includes(uid)) {
            location.replace('https://roomie-2024.web.app/');
        } else {
            await updateDoc(roomRef, {users: arrayUnion(uid)});
            location.replace('https://roomie-2024.web.app/');
        }
    } else {
        console.log("room not found");
    }

}
