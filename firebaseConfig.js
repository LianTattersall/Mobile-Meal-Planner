import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseKey";

initializeApp(firebaseConfig);

const auth = getAuth();

export default auth;
