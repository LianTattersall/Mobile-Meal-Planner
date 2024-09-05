import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDUmZpunatpeowCHr01BVh_NS3lsav9ig",
  authDomain: "mobilemealplanner.firebaseapp.com",
  projectId: "mobilemealplanner",
  storageBucket: "mobilemealplanner.appspot.com",
  messagingSenderId: "719468819552",
  appId: "1:719468819552:web:2e0b520512f7baaa81bf05",
  measurementId: "G-KR3W87P153",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default auth;
