import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// import './joinRoom.js';
import items from './components/items';
import { db, auth } from './firebase-config';



//Initialize firebase
// const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
const user = auth.currentUser;



onAuthStateChanged(auth, (user) => {
    const loginElements = document.querySelectorAll(".login-signup");
    const accountElements = document.querySelectorAll(".account");
    if (user) {
        // document.getElementsByClassName("login/signup").style.display = 'none';
        loginElements.forEach(element => {
            element.style.display = 'none';
            getUserData(user.uid);
        });
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

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const addItemForm = document.querySelector("#add-item");
const logout = document.querySelector("#logout");


logout.addEventListener('click', (event) => {
    console.log('attempting logout...');
    // const user = auth.currentUser;
    console.log(user);
    if (true){
        signOut(auth) .then(() => {
          location.reload();
            //sign out succesful
        }) .catch((error) => {
            console.log('an error occured', error);
        });
    }
});
signupForm.addEventListener("submit", (event) => {
    // event.preventDefault();

    const email = signupForm.querySelector("input[name='email']").value;
    console.log(email);
    const password = signupForm.querySelector("input[name='password']").value;
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed up
            console.log(`account ${user} has been created, logging in...`);
            signInWithEmailAndPassword(auth, email, password);
            location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = loginForm.querySelector("input[name='email']").value;
    console.log(email);
    const password = loginForm.querySelector("input[name='password']").value;
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            console.log(`username is ${user.email}`)
            location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemName = addItemForm.querySelector("input[name='item']").value;
  addItem(itemName);

});





const groupCol = collection(db, 'rooms');

//R0ng35OYrvHCPDNMjvWJ
async function getUserData(uid) {
    const userCol = collection(db, 'users');
    if(uid != null){
        // console.log(user.uid);
        const snapshot = await getDoc(doc(userCol, uid));
    
        if (snapshot.exists()) {
            const data = snapshot.data();
            document.getElementById('username').innerHTML = data.name;
            console.log('username is ', data.name);
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

  getItems();
}

// async function updateItem(key, status) {
//   var num = -1;
//   switch(status) {
//     case "Good":
//       num = 2;
//       break;
//     case "Low":
//       num = 1;
//       break;
//     case "Out":
//       num = 0;
//       break;
//     default:
//       num = 0;
//       console.log("Something went wrong");
//   }
//   const docPath = doc(groupCol, 'mDo2PQQxBxgVzdK43FMA/contents/items');
//   const snapshot = await getDoc(docPath);
//   if(snapshot.exists()) {
//     const itemData = {
//       [key]: [num],
//     };
//     updateDoc(docPath, itemData);
//   }
// }

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
        //   var status = "Loading";
        //   switch (value) {
        //       case 0:
        //           status = `Out of ${key}`;
        //           break;
        //       case 1:
        //           status = `Running Low on ${key}`;
        //           break;
        //       case 2:
        //           status = `${key} Stock is Good`;
        //           break;
        //       default:
        //           status = `Invalid ${key} Status`;
        //     }
    // document.getElementById("milkStatus").innerHTML = status;
        //   div.innerHTML += (`<p class=household_item>${key} &nbsp ${status} <label for="${key}-supply">Update Status:</label>
        //   <select onchange="updateItem('${key}', this.value)", name="${key}-supply" id="{key}-supply"> 
        //     <option value="Empty">Empty</option> 
        //     <option value="Low">Low</option> 
        //     <option value="Good">Good</option> 
        // </select>  </p>  `);
    } else {
      div.appendChild = "No items currently"
    }

}

getItems();
