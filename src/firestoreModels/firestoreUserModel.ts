import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection,
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
import firebaseConfig from "./firebaseConfig";
import { AppUser, SignUpData } from "../types/user";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const COLLECTION_NAME_USERS = "users";

// Function to sign up with email & password
export async function signUpWithEmail({
    email,
    password,
    username,
  }: SignUpData) {
    try {
      // 1. Check if username is already taken
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        throw new Error("Username is already taken.");
      }

      if(username.length < 3){
        throw new Error("You must provide a username with a minimum of 3 characters.")
      }
  
      // 2. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // 3. Save user to Firestore
      await setDoc(doc(db, COLLECTION_NAME_USERS, user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });
  
    } catch (error : any) {  
      throw error;
    }
  }

// Function to sign in with email & password
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AppUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      const appUser: AppUser = {
        uid: user.uid,
        email: user.email ?? "",
        username: userData.username || "",
        createdAt: userData.createdAt,
      };

      return appUser;
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: any) {
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
    const userDocRef = doc(db, COLLECTION_NAME_USERS, user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        name: user.displayName,
        createdAt: new Date().toISOString(),
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
    const userDocRef = doc(db, COLLECTION_NAME_USERS, userId);
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

export async function searchUsersByUsername(username: string) {
  const usersRef = collection(db, COLLECTION_NAME_USERS);

  const q = query(
    usersRef,
    where("username", ">=", username),
    where("username", "<=", username + "\uf8ff"),
    orderBy("username"),
    limit(4) // Add the limit here
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching users found.");
    return []; // Return an empty array if no users are found
  }

  const users: AppUser[] = []; 

  querySnapshot.forEach((doc) => {
    let userData = doc.data();
    users.push({
      uid: userData.uid,
      email: userData.email ?? "",
      username: userData.username || "",
      createdAt: userData.createdAt,
    });
  });

  return users; 
}
