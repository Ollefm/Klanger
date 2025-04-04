import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithCredential 
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const COLLECTION_NAME = "users";

// Function to sign up with email & password
export async function signUpWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user to Firestore
    await setDoc(doc(db, COLLECTION_NAME, user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });

    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Sign-up error:", error.message);
    throw error;
  }
}

// Function to sign in with email & password
export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
}

// Function to sign in with Google
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user to Firestore if it's their first login
    const userDocRef = doc(db, COLLECTION_NAME, user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        name: user.displayName,
        createdAt: new Date().toISOString()
      });
    }

    console.log("Google sign-in successful:", user);
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
}

// Function to fetch user data from Firestore
export async function getUserData(userId) {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
