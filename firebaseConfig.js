import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { exp } from "firebase/firestore/pipelines";

const firebaseConfig = {
  apiKey: "AIzaSyAFvhta3Hrigqd4khrY1vNZhpgYF_ZylgY",
  authDomain: "web-cloud-ynov-ccbdc.firebaseapp.com",
  projectId: "web-cloud-ynov-ccbdc",
  storageBucket: "web-cloud-ynov-ccbdc.firebasestorage.app",
  messagingSenderId: "236983712572",
  appId: "1:236983712572:web:63f7ecfabfb4d958807c39",
  measurementId: "G-7K00YMG65H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;