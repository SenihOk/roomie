import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// import './joinRoom.js';
import items from './components/items';
import { db, auth, user} from './firebase-config';
import watchForms from './forms';


// Initialize Firebase Authentication and get a reference to the service

// const user = auth.currentUser;


onAuthStateChanged(auth, (user) => {
    const loginElements = document.querySelectorAll(".login-signup");
    const accountElements = document.querySelectorAll(".account");
    if (user) {
        // document.getElementsByClassName("login/signup").style.display = 'none';
        loginElements.forEach(element => {
            element.style.display = 'none';
        });
        getUserData(user.uid);
        getRoomData(user.uid);
        console.log('user is logged in', user.email);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
    } else {
        console.log('user is not logged in');
        accountElements.forEach(element => {
            element.style.display = 'none';
        });        // document.getElementById('logout').style.display = 'none';
        // document.getElementById('username').style.display = 'none';
        // User is signed out
    }
  });


const addItemForm = document.querySelector("#add-item");
addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = addItemForm.querySelector("input[name='item']").value;
    addItem(itemName);

});
watchForms();

const groupCol = collection(db, 'rooms');
const userCol = collection(db, 'users');

//R0ng35OYrvHCPDNMjvWJ
async function getUserData(uid) {
    if(uid != null){
        // console.log(user.uid);
        const snapshot = await getDoc(doc(userCol, uid));
    
        if (snapshot.exists()) {
            const data = snapshot.data();
            document.getElementById('username').innerHTML = data.name;
            // console.log('username is ', data.name);
            // console.log('fetching roommates...');
        }
    }
}
async function getRoomData(uid){
    // console.log('calling getRoomData function');
    document.getElementById('users').innerHTML = ("roommates:");
    const userSnap = await getDoc(doc(userCol, uid));
    if(userSnap.exists()) {
        const roomID = userSnap.data().room;
        console.log(roomID);
        const snapshot = await getDoc(doc(groupCol, roomID));
        if(snapshot.exists()) {
            const data = snapshot.data();
            // console.log(data);
            for (const user of data.users){
                const userSnap = await getDoc(doc(userCol, user));
                if (userSnap.exists()){
                    const name = userSnap.data().name
                    document.getElementById('users').innerHTML += (name + ", ");
                }
            }
            // console.log('data: ', data);
            // Object.entries(data.users).forEach((user) => {
            // });
            // userSnap.data().name
            // });
            // document.getElementById('users').innerHTML -= (', ');
        }
    }
}

async function addItem(key) {
  const docPath = doc(groupCol, 'mDo2PQQxBxgVzdK43FMA/contents/items');
  const snapshot = await getDoc(docPath);
  if(snapshot.exists()) {
    // const docData = snapshot.data();
    const itemData = {
      [key]: 2,
    };
    updateDoc(docPath, itemData);
  }
  // location.reload();

  getItems();
}


async function getItems() {
    var div = document.getElementById("item-status");
    div.innerHTML = "Loading";
    const snapshot = await getDoc(doc(groupCol, 'mDo2PQQxBxgVzdK43FMA/contents/items'));
    if(snapshot.exists()) {
        div.innerHTML = "";
        const docData = snapshot.data();
        // console.log(`My data is ${JSON.stringify(docData.Milk)}`);
        // var milkStatus = docData.Milk;
        Object.entries(docData).forEach(([name, status]) => {
            // const [key, value] = entry;
            const item = items(name,status) ;
        //   console.log(`${key}: ${value}`);
            div.appendChild(item);
        });
    } else {
      div.appendChild = "No items currently"
    }

}

getItems();
