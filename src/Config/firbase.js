// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc6B9i_uKhvoG-BpDLE_UzY4atscPpyjg",
  authDomain: "cine-mania-a69c1.firebaseapp.com",
  projectId: "cine-mania-a69c1",
  storageBucket: "cine-mania-a69c1.appspot.com",
  messagingSenderId: "712628093911",
  appId: "1:712628093911:web:95174618f8ff4891a84192",
  measurementId: "G-6DRJ0L1EVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
