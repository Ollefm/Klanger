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
  runTransaction
} from "firebase/firestore";
import { AppUser, SignUpData } from "../types/user";
import { db, auth } from "../firebaseConfig";

// Initialize Firebase
const COLLECTION_NAME_CHALLENGES = "challenges";
const COLLECTION_NAME_USERS = "users";

export async function challengeUser(fromUid : string, toUid : string, fromUsername : string, toUsername : string) {

    const challengeRef = collection(db, COLLECTION_NAME_CHALLENGES);

    try {
       await addDoc(challengeRef, {
      from: fromUid,
      to: toUid,
      fromUsername: fromUsername,
      toUsername: toUsername,
      status: "pending",
    });
    }catch(error: any){
      throw new Error("Failed to challenge user", error);
    }
   
}

export async function listenForChallenges(userId) {
  const q = query(
    collection(db, "challenges"),
    where("to", "==", userId),
    where("status", "==", "pending")
  );


  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching challenges found.");
    return []; 
  }

  const challenges = [];

  querySnapshot.forEach((challenge) => {
    let challengeData = challenge.data();
    challenges.push({
      id: challenge.id,
      ...challengeData
    });
  });
  return challenges;

}

export async function acceptChallenge(challengeId: string, acceptingUserId: string) {
  const challengeRef = doc(db, "challenges", challengeId);
  const gamesRef = collection(db, "games");

  const gameId = await runTransaction(db, async (transaction) => {
    const challengeSnap = await transaction.get(challengeRef);

    if (!challengeSnap.exists()) {
      throw new Error("Challenge does not exist.");
    }

    const challengeData = challengeSnap.data();

    if (challengeData.status !== "pending") {
      throw new Error("Challenge is not pending.");
    }

    if (challengeData.to !== acceptingUserId) {
      throw new Error("Not authorized to accept this challenge.");
    }

    // Create the game
    const newGameRef = doc(gamesRef); // Manually create a new game ref
    transaction.set(newGameRef, {
      players: [challengeData.from, challengeData.to],
      currentTurn: challengeData.from,
      state: "in_progress",
      moves: [],
      createdAt: new Date(),
    });

    // Update the challenge document
    transaction.set(challengeRef, {
      ...challengeData,
      status: "accepted",
      acceptedAt: new Date(),
      gameId: newGameRef.id,
    });

    return newGameRef.id;
  });

  return gameId;
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

export async function getChallengeIdsForCurrentUser(userId){
    try {
    const q = query(
      collection(db, "challenges"),
      where("from", "==", userId),
      where("status", "==", "pending")
    );

    const querySnapshot = await getDocs(q);

    const ids: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.to) {
        ids.push(data.to);
      }
    });

    return ids;

  } catch (error) {
    console.error("Failed to fetch challenged user IDs:", error);
  }
}
