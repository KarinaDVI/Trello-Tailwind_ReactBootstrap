// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8XXGPDKN3aqacErMZoA6ThAYNb2eiGnA",
  authDomain: "trello-cacbouza.firebaseapp.com",
  projectId: "trello-cacbouza",
  storageBucket: "trello-cacbouza.appspot.com",
  messagingSenderId: "801006918646",
  appId: "1:801006918646:web:b0e73121c66a58d11245d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);