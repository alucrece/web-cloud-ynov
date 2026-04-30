// firebase/auth_phone.js
import "../firebaseConfig";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();

export const loginWithPhone = (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
    
      console.log("SMS envoyé");
      return confirmationResult;
    }).catch((error) => {
      console.log("Erreur SMS", error);
    });
};