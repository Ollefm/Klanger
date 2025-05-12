import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection,
  addDoc,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import { AppUser, SignUpData } from "../types/user";

// Initialize Firebase
const COLLECTION_NAME_CHALLENGES = "challenges";

export async function challengeUser(fromUid : string, toUid : string) {

    const challengeRef = collection(db, COLLECTION_NAME_CHALLENGES);

    await addDoc(challengeRef, {
      from: fromUid,
      to: toUid,
      status: "pending",
    });
    
}

export async function getChallenges(userId: string) {
    const challengesRef = collection(db, COLLECTION_NAME_CHALLENGES);
    const q = query(
      challengesRef,
      where("to", "==", userId),
      where("status", "==", "pending")
    );
  
    const snapshot = await getDocs(q);
    return snapshot;
}
