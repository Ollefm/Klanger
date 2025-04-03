import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
const app = initializeApp(firebaseConfig);

import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

const db = getFirestore(app);

global.doc = doc;
global.db = db;
global.setDoc = setDoc;

const COLLECTION_NAME = "users";

export async function testFunction(userId: string) {
    try {
      const userDocRef = doc(db, COLLECTION_NAME, userId);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        console.log("User data:", userSnapshot.data());
        return userSnapshot.data();
      } else {
        console.log("No such document! Creating dummy user...");
        const dummyData = {
          name: "Test User",
          email: "test@example.com",
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, dummyData);
        console.log("Dummy user created:", dummyData);
        return dummyData;
      }
    } catch (error) {
      console.error("Error fetching or creating user:", error);
      throw error;
    }
  } 
  
