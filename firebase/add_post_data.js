import app from "../firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export const createPost = async (title, text, createBy) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title, text,
            date: new Date(),
            createBy
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}