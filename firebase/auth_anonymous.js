import "../firebaseConfig";
import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();
export const signInAnonymouslyUser = () => {
    return signInAnonymously(auth)
        .then((userCredential) => {
            console.log("User signed in anonymously");
            return userCredential;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}