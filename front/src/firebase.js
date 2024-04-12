// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6P3YOyMdH0DT-7YjsK3KoxkOeSGD5c4Y",
  authDomain: "autocare-36188.firebaseapp.com",
  projectId: "autocare-36188",
  storageBucket: "autocare-36188.appspot.com",
  messagingSenderId: "188034271180",
  appId: "1:188034271180:web:71bd1d6c6e2a4bbc9dff69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);