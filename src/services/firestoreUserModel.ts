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

import { AppUser } from "../types/user";
import { db, auth } from "../firebaseConfig";

const COLLECTION_NAME_USERS = "users";
const readySemaphore = false;


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
    limit(4)
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
