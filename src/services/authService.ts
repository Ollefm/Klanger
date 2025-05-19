import {
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
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AppUser } from "../types/user";
import { db, auth } from "../firebaseConfig";
import { getLBData } from "./firestoreUserModel";

const COLLECTION_NAME_USERS = "users";
const COLLECTION_NAME_LEADERBOARD = "leaderboard";
const readySemaphore = false;

export function connectToPersistence(model, reactionFn) {


  async function handleUser(firebaseUser) {
    if (!firebaseUser) {
      model.reset();
      return;
    }

    model.user = firebaseUser;
    
    try {
      const appUser = await getUserData(firebaseUser.uid);
      //const UserLBData = await getUserLBData(firebaseUser.uid);
      const LBData = await getLBData();
      model.leaderboard = LBData;
      const userLBData = LBData.find(findUserByIDCB);

      function findUserByIDCB(user){
        return user.uid === firebaseUser.uid;
      }

      if (userLBData) {
        model.totalScore = userLBData.totalScore;
        model.gamesPlayed = userLBData.gamesPlayed;
      } else {
        model.totalScore = 0;
        model.gamesPlayed = 0;
      }
      
      model.userData = appUser;

     model.listenForChallenges() 
     model.listenForGames() 

    } catch (error) {
      console.error("Error loading Firestore user data:", error);
      model.userData = null;
    }
  }

  // Immediate check 
  if (auth.currentUser) {
    handleUser(auth.currentUser);
  }

  // Firebase listener for auth state changes
 onAuthStateChanged(auth, (firebaseUser) => {
  handleUser(firebaseUser);
});
}


export async function signUpWithEmail(
  email: string,
  username: string,
  password: string
) {
  try {
    // 1. Check if username is already taken
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      throw new Error("Username is already taken.");
    }

    if (username.length < 3) {
      throw new Error(
        "You must provide a username with a minimum of 3 characters."
      );
    }

    // 2. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 3. Save user to Firestore
    await setDoc(doc(db, COLLECTION_NAME_USERS, user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date(),
    });
    await setDoc(doc(db, COLLECTION_NAME_LEADERBOARD, user.uid), {
      uid: user.uid,
      username: username,
      totalScore: 0,
      gamesPlayed: 0,
    });
  } catch (error: any) {
    throw error;
  }
}

// Function to sign in with email & password
export async function signInWithEmail(
  email: string,
  password: string
): Promise<void> {
  console.log(email, password);
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error: any) {
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
export async function getUserLBData(userId) {
  try {
    const userDocRef = doc(db, COLLECTION_NAME_LEADERBOARD, userId);
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

