import 'firebase/firestore';
import { db,auth } from './firebase-config';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function watchForms(){
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");
    const addItemForm = document.querySelector("#add-item");
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
}
export default watchForms;