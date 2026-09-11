import {initializeApp} from "firebase/app";
import {getFirestore,} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCickhHlzA6oSnAxpAITAGb4J3uRKPtzdU",
  authDomain: "solve-it-d4338.firebaseapp.com",
  projectId: "solve-it-d4338",
  storageBucket: "solve-it-d4338.firebasestorage.app",
  messagingSenderId: "1066273066975",
  appId: "1:1066273066975:web:1096f1f1e4df202e38be6a",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const auth =getAuth(app);

export {auth};