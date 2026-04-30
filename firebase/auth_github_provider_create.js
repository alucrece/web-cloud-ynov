import "../firebaseConfig";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GithubAuthProvider();

export const signInWithGithub = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Connecté via GitHub :", user.displayName);
      return user;
    })
    .catch((error) => {
      console.error("Erreur GitHub :", error.code);
      throw error;
    });
};