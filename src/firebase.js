import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqvO-ubbB9rqLGL_RtGcovqaSM7HefUcw",
  authDomain: "medical-bills-app.firebaseapp.com",
  projectId: "medical-bills-app",
  storageBucket: "medical-bills-app.appspot.com",
  messagingSenderId: "1054086412902",
  appId: "1:1054086412902:web:4d095845f497d9bb700ba7",
  measurementId: "G-0CXER8HR0Q"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };
export default firebase;