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

const COLLECTION_NAME_USERS = "users";
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
      model.userData = appUser;

      if (typeof reactionFn === "function") {
        reactionFn(checkACB, sideEffectACB);
      }

      function checkACB() {
        return [model.dishes, model.preferences];
      }

      function sideEffectACB() {
        if (model.user) {
          saveToFirestore(model);
        }
      }

      readFromFirestore(model)

    } catch (error) {
      console.error("Error loading Firestore user data:", error);
      model.userData = null;
    }
  }

  // 1. Handle immediately if user is already signed in ( on reload)
  if (auth.currentUser) {
    handleUser(auth.currentUser);
  }

  // 2. Listen to any future auth changes
  onAuthStateChanged(auth, (firebaseUser) => {
    handleUser(firebaseUser);
  });
}

async function saveToFirestore(model) {
  model.ready = false;
  try {
    await setDoc(
      doc(db, COLLECTION_NAME_USERS, model.user.uid),
      {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      },
      { merge: true }
    );
  } catch (error: any) {
    throw error;
  } finally {
    model.ready = true;
  }
}

async function readFromFirestore(model) {
  model.ready = false;
  try {
    const userDoc = await getDoc(
      doc(db, COLLECTION_NAME_USERS, model.user.uid)
    );
    if (userDoc.exists()) {
      const userData = userDoc.data();

      const appUser: AppUser = {
        uid: userData.uid,
        email: userData.email ?? "",
        username: userData.username || "",
        createdAt: userData.createdAt,
      };

      return appUser;
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: any) {
    throw error;
  } finally {
    model.ready = true;
  }
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
