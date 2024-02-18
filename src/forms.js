import 'firebase/firestore';
import { db,auth, user } from './firebase-config';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';

async function signUpUser(uid, username){
    console.log('signing up...');

    const userData = {
        name: username,
        room: "mDo2PQQxBxgVzdK43FMA",
    }
    console.log(username);

    const docRef = doc(db, 'users', uid);
    // const roomRef = doc(db, 'rooms', 'mDo2PQQxBxgVzdK43FMA')
    // console.log(userCol);
    console.log(docRef);
    // const userDoc = doc(userCol, uid);
    // console.log(userDoc);
    // const userRef = 
    await setDoc(docRef, userData);
    // await setDoc(roomRef, )

}

function watchForms(){
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");
    const logout = document.querySelector("#logout");

    logout.addEventListener('click', (event) => {
        console.log('attempting logout...');
        if (true){
            signOut(auth) .then(() => {
                //sign out succesful
                location.reload();
            }) .catch((error) => {
                console.log('an error occured', error);
            });
        }
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = signupForm.querySelector("input[name='email']").value;
        console.log(email);
        const password = signupForm.querySelector("input[name='password']").value;
        console.log(password);
        const username = signupForm.querySelector("input[name='username']").value;
        console.log(username);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                //signed up
                const user = userCredential.user 
                console.log(user.uid);
                console.log(`account ${user.uid} has been created, logging in...`);
                await signUpUser(user.uid, username);
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

    
}
export default watchForms;