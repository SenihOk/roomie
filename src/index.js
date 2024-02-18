import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


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
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log('hello there, firebase auth is running!');
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
    } else {
      // User is signed out
    }
  });

//TO-DO: create form for signup/signin
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = loginForm.querySelector("input[name='email']").value;
    const password = loginForm.querySelector("input[name='password']").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            console.log(`username is ${user}`)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

const db = getFirestore(app);

console.log('hello there, firestore is running!');


const groupCol = collection(db, 'groups');


async function getMilk() {
    var div = document.getElementById("item-status").innerHTML;
    div.innerHTML = "No items currently";
    const snapshot = await getDoc(doc(groupCol, 'R0ng35OYrvHCPDNMjvWJ'));
    if(snapshot.exists()) {
        div.innerHTML = "Loading...";
        console.log('milk status retrieved');
        const docData = snapshot.data();
        console.log(`My data is ${JSON.stringify(docData.Milk)}`);
        var milkStatus = docData.Milk;
        Object.entries(docData).forEach((entry) => {
          const [key, value] = entry;
          console.log(`${key}: ${value}`);
        });
    }

    
    
    var status = "Loading";
    switch (milkStatus) {
        case 0:
            status = "Out of Milk";
            break;
        case 1:
            status = "Running Low on Milk";
            break;
        case 2:
            status = "Milk Stock is Good";
            break;
        default:
            status = "Invalid Milk Status";
        }
    document.getElementById("milkStatus").innerHTML = status;
}

getMilk();