import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
console.log("Firebase Config:", firebaseConfig);
const app = initializeApp(firebaseConfig);

import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

const db = getFirestore(app);

global.doc = doc;
global.db = db;
global.setDoc = setDoc;

const COLLECTION_NAME = "users";

export function connectFirestore() {
  console.log("Connected to Firestore");
}