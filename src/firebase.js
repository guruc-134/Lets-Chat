import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDVEsJR5yhRzH540eEqtTVR2aOENmZ3GmU",
  authDomain: "lets-chat134.firebaseapp.com",
  projectId: "lets-chat134",
  storageBucket: "lets-chat134.appspot.com",
  messagingSenderId: "4246215424",
  appId: "1:4246215424:web:db8283030e77bfc2cb31e5",
  measurementId: "G-TFDXHKSWPE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;