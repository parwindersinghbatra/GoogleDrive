// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCPRUFg7hlgqaL4cWo5jUmL0KQS5WRMb7k",
//     authDomain: "driveclone-43095.firebaseapp.com",
//     projectId: "driveclone-43095",
//     storageBucket: "driveclone-43095.appspot.com",
//     messagingSenderId: "83109846421",
//     appId: "1:83109846421:web:3fc494b2cdff24a3452a9c",
//     measurementId: "G-PWQM51KEK1"
//   };


//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = app.firestore();

// const storage = getStorage(app);

//   const db = firebaseApp.firestore();

//   const storage = firebase.storage();

//   const auth = firebase.auth();

//   const provider = new firebase.auth.GoogleAuthProvider();

//   export { app, auth, storage, provider, db };


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPRUFg7hlgqaL4cWo5jUmL0KQS5WRMb7k",
  authDomain: "driveclone-43095.firebaseapp.com",
  projectId: "driveclone-43095",
  storageBucket: "driveclone-43095.appspot.com",
  messagingSenderId: "83109846421",
  appId: "1:83109846421:web:3fc494b2cdff24a3452a9c",
  measurementId: "G-PWQM51KEK1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, storage, provider, db};
