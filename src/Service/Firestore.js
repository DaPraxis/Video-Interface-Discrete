import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB697BzNi5CLaT6OPnj8BSMaMUCsy7Wc8s",
  authDomain: "dmwl-online-rating-tool.firebaseapp.com",
  projectId: "dmwl-online-rating-tool",
  storageBucket: "dmwl-online-rating-tool.appspot.com",
  messagingSenderId: "871903544953",
  appId: "1:871903544953:web:3566c61d7859f0081fb6a8",
  measurementId: "G-9GZ0JLKWM5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };