import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';

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

const db = getFirestore(app);

console.log('hello there, firestore is running!');

const groupCol = collection(db, 'groups');


async function getMilk() {
    const snapshot = await getDoc(doc(groupCol, 'R0ng35OYrvHCPDNMjvWJ'));
    if(snapshot.exists()) {
        const docData = snapshot.data();
        console.log(`My data is ${JSON.stringify(docData)}`);
    }
    const milkStatus = docData.Milk

    let status = "Unknown";
          switch (milkValue) {
            case 0:
              status = "Out of Milk";
              alert("Milk is 0")
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