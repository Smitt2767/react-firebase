import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzgyi4Gm_INxcltNTbuxSEx10RBuwp-00",
  authDomain: "to-do-1e2f9.firebaseapp.com",
  projectId: "to-do-1e2f9",
  storageBucket: "to-do-1e2f9.appspot.com",
  messagingSenderId: "1013725887968",
  appId: "1:1013725887968:web:6fa67e222b12e83b94bf85",
  measurementId: "G-43ND3GTYSK",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const userRef = firestore.collection("users");
export default firebase;
