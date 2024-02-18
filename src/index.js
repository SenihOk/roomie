import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';


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
const user = auth.currentUser;

console.log('hello there, firebase auth is running!');

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login/signup').style.display = 'none';
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
    } else {
        document.getElementById('account').style.display = 'none';
        // document.getElementById('logout').style.display = 'none';
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
    if (user){
        signOut(auth) .then(() => {
            //sign out succesful
        }) .catch((error) => {
            console.log('an error occured', error);
        });
    } else {
        console.log('an error occured, user equals null');
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
            console.log(`username is ${user}`)
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

const db = getFirestore(app);

console.log('hello there, firestore is running!');


const groupCol = collection(db, 'rooms');

//R0ng35OYrvHCPDNMjvWJ
async function getUserData() {
    const userCol = collection(db, 'users');
    if(user != null){
        console.log(user.uid);
        const snapshot = await getDoc(userCol, user.uid);
    
        if (snapshot.exists()) {
            const Data = snapshot.data();
            document.getElementById('username').innerHTML = Data.name;
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

async function updateItem(key, status) {
  var num = -1;
  switch(status) {
    case "Good":
      num = 2;
      break;
    case "Low":
      num = 1;
      break;
    case "Out":
      num = 0;
      break;
    default:
      num = 0;
      console.log("Something went wrong");
  }
  const docPath = doc(groupCol, 'mDo2PQQxBxgVzdK43FMA/contents/items');
  const snapshot = await getDoc(docPath);
  if(snapshot.exists()) {
    const itemData = {
      [key]: [num],
    };
    updateDoc(docPath, itemData);
  }
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
        Object.entries(docData).forEach((entry) => {
          const [key, value] = entry;
          // console.log(`${key}: ${value}`);
          var status = "Loading";
          switch (value) {
              case 0:
                  status = `Out of ${key}`;
                  break;
              case 1:
                  status = `Running Low on ${key}`;
                  break;
              case 2:
                  status = `${key} Stock is Good`;
                  break;
              default:
                  status = `Invalid ${key} Status`;
            }
    // document.getElementById("milkStatus").innerHTML = status;
          div.innerHTML += (`<p class=household_item>${key} &nbsp ${status} <label for="${key}-supply">Status:</label>
          <select onchange="updateItem(${key}, this.value)", name="${key}-supply" id="{key}-supply"> 
            <option value="Empty">Empty</option> 
            <option value="Low">Low</option> 
            <option value="Good">Good</option> 
        </select>  </p>  `);
        });
    } else {
      div.innerHTML = "No items currently"
    }

}

getItems();
getUserData();
//addItem(soap);



// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
// import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';
// import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut } from 'firebase/auth';


// const firebaseConfig = {
//     apiKey: "AIzaSyC-Qm_LLk19v6sR1ewasQ5v6zqAJLQ1ZRE",
//     authDomain: "roomie-2024.firebaseapp.com",
//     databaseURL: "https://roomie-2024-default-rtdb.firebaseio.com",
//     projectId: "roomie-2024",
//     storageBucket: "roomie-2024.appspot.com",
//     messagingSenderId: "993286279870",
//     appId: "1:993286279870:web:47d7cdf18f77c3e53e84ef"
//   };

// //Initialize firebase
// const app = firebase.initializeApp(firebaseConfig);

// //intialize firestore storage
// const db = getFirestore(app);

// console.log('hello there, firestore is running!');

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
// const user = auth.currentUser;
// console.log('hello there, firebase auth is running!');
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         document.getElementById('login/signup').style.display = 'none';
//         // getUserData();
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//     } else {

//         // User is signed out
//     }
//   });

// const loginForm = document.querySelector("#login-form");
// const signupForm = document.querySelector("#signup-form");


// signupForm.addEventListener("submit", (event) => {
//     // event.preventDefault();

//     const email = signupForm.querySelector("input[name='email']").value;
//     console.log(email);
//     const password = signupForm.querySelector("input[name='password']").value;
//     console.log(password);

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             //signed up
//             console.log(`account ${user} has been created, logging in...`);
//             signInWithEmailAndPassword(auth, email, password);
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
// });
// loginForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const email = loginForm.querySelector("input[name='email']").value;
//     console.log(email);
//     const password = loginForm.querySelector("input[name='password']").value;
//     console.log(password);

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             //signed in
//             const user = userCredential.user;
//             console.log(`username is ${user}`)
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
// });



// const groupCol = collection(db, 'groups');

// function getRoom(){
//     const room = 'R0ng35OYrvHCPDNMjvWJ';
//     return room;
// }



// async function getMilk() {
//     var div = document.getElementById("item-status");
//     div.innerHTML = "No items currently";
//     const snapshot = await getDoc(doc(groupCol, getRoom()));
//     if(snapshot.exists()) {
//         div.innerHTML = "";
//         const docData = snapshot.data();
//         // console.log(`My data is ${JSON.stringify(docData.Milk)}`);
//         // var milkStatus = docData.Milk;
//         Object.entries(docData).forEach((entry) => {
//           const [key, value] = entry;
//           // console.log(`${key}: ${value}`);
//           var status = "Loading";
//           switch (value) {
//               case 0:
//                   status = `Out of ${key}`;
//                   break;
//               case 1:
//                   status = `Running Low on ${key}`;
//                   break;
//               case 2:
//                   status = `${key} Stock is Good`;
//                   break;
//               default:
//                   status = `Invalid ${key} Status`;
//             }
//     // document.getElementById("milkStatus").innerHTML = status;
//           div.innerHTML += (`<p>${key} &nbsp ${status}</p>`);
//         });
//     }

// }
// getUserData();
// getMilk();