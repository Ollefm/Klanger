import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { AppUser, UserLBData } from "../types/user";
import { db, auth } from "../firebaseConfig";

const COLLECTION_NAME_USERS = "users";
const COLLECTION_NAME_LEADERBOARD = "leaderboard";
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

export async function updateUserLBData(userId, username, score, gamesPlayed, scoreHistory) {
  try {
    const userDocRef = doc(db, COLLECTION_NAME_LEADERBOARD, userId);
    await setDoc(userDocRef, {
      uid: userId,
      username: username,
      totalScore: score,
      gamesPlayed: gamesPlayed,
      scoreHistory: scoreHistory,
    },{ merge: true });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

export async function getLBData() {
  try {
    const usersRef = collection(db, COLLECTION_NAME_LEADERBOARD);
    const q = query(usersRef, orderBy("totalScore", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    const leaderboard: UserLBData[] = [];

    querySnapshot.forEach((doc) => {
      let userData = doc.data();
      leaderboard.push({
        uid: userData.uid,
        username: userData.username || "",
        totalScore: userData.totalScore,
        gamesPlayed: userData.gamesPlayed,
        scoreHistory: userData.scoreHistory || [],
      });
    });

    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
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
