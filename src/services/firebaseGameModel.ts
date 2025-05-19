import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  addDoc,
  runTransaction,
  onSnapshot,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "@firebase/firestore";

import { db } from "../firebaseConfig";
import { AppUser } from "../types/user";

const COLLECTION_USERS = "users";
const COLLECTION_CHALLENGES = "challenges";
const COLLECTION_GAMES = "games";

export const firebaseGameService = {
  //  Search users
  async searchUsersByUsername(username: string): Promise<AppUser[]> {
    const usersRef = collection(db, COLLECTION_USERS);

    const q = query(
      usersRef,
      where("username", ">=", username),
      where("username", "<=", username + "\uf8ff"),
      orderBy("username"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      uid: doc.data().uid,
      username: doc.data().username,
      email: doc.data().email,
      createdAt: doc.data().createdAt,
    }));
  },

  // Send a challenge
async challengeUser(
  fromUid: string,
  toUid: string,
  fromUsername: string,
  toUsername: string
) {
  const challengesRef = collection(db, "challenges");

  // Check for an existing challenge in either direction
  const q = query(
    challengesRef,
    where("from", "in", [fromUid, toUid]),
    where("to", "in", [fromUid, toUid])
  );

  const existingSnap = await getDocs(q);

  // If there’s already a challenge between them
  if (!existingSnap.empty) {
    const existing = existingSnap.docs.find((doc) => {
      const data = doc.data();
      return (
        (data.from === fromUid && data.to === toUid) ||
        (data.from === toUid && data.to === fromUid)
      );
    });

    if (existing) {
      const challengeData = existing.data();

      // If the another user already challenged this user, auto-accept it
      if (challengeData.from === toUid && challengeData.to === fromUid) {
        await this.acceptChallenge(existing.id, fromUid);
        return;
      }

      // If current user already challenged
      throw new Error("Challenge already exists.");
    }
  }

  // No challenge exists in either direction, create a new one
  await addDoc(challengesRef, {
    from: fromUid,
    to: toUid,
    fromUsername,
    toUsername,
    status: "pending",
    createdAt: Timestamp.now(),
  });
},

 // Accept a challenge and create a game
async acceptChallenge(
  challengeId: string,
  acceptingUserId: string
): Promise<string> {
  const challengeRef = doc(db, COLLECTION_CHALLENGES, challengeId);
  const gamesRef = collection(db, COLLECTION_GAMES);
  
  const gameId = await runTransaction(db, async (transaction) => {
    const challengeSnap = await transaction.get(challengeRef);
    if (!challengeSnap.exists()) throw new Error("Challenge not found.");

    const challengeData = challengeSnap.data();
    if (challengeData.to !== acceptingUserId)
      throw new Error("Unauthorized.");

    // Create new game document
    const newGameRef = doc(gamesRef);
    transaction.set(newGameRef, {
      playerIds: [challengeData.from, challengeData.to],
      players: [
        { uid: challengeData.from, username: challengeData.fromUsername },
        { uid: challengeData.to, username: challengeData.toUsername },
      ],
      currentTurn: challengeData.from,
      roundResults: {},
      isFinished: false,
      guessesSongsIDs: [],
      createdAt: new Date(),
    });

    // delete the challenge
    transaction.delete(challengeRef);

    return newGameRef.id;
  });

  

  return gameId;
},

  // Decline a challenge
async declineChallenge(challengeId: string) {
  const challengeRef = doc(db, COLLECTION_CHALLENGES, challengeId);
  const challengeSnap = await getDoc(challengeRef);

  if (!challengeSnap.exists()) throw new Error("Challenge not found.");

  // Just delete it 
  await deleteDoc(challengeRef);
},

  async listenForChallenges(userId: string): Promise<any[]> {
     try {
    const toQuery = query(
      collection(db, COLLECTION_CHALLENGES),
      where("to", "==", userId),
      where("status", "==", "pending")
    );
    const toSnapshot = await getDocs(toQuery);
    
    const fromQuery = query(
      collection(db, COLLECTION_CHALLENGES),
      where("from", "==", userId),
      where("status", "==", "pending")
    );
    const fromSnapshot = await getDocs(fromQuery);
    
    const challenges = [
      ...toSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        direction: "incoming" 
      })),
      ...fromSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        direction: "outgoing" 
      }))
    ];
    
    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
  },

    async updateGame(gameId: string, gameDataToUpdate) { 
    const gameRef = doc(db, COLLECTION_GAMES, gameId);
    try {
      await updateDoc(gameRef, gameDataToUpdate);
    } catch (error) {
      console.error("Error updating game in Firestore:", error);
      throw error;
    }
  },

 async removeGame(gameId: string) {
  try {
    const gameRef = doc(db, COLLECTION_GAMES, gameId);
    await deleteDoc(gameRef);
  } catch (error) {
    console.error("Failed to delete game:", error);
    throw error;
  }
},

  listenToIncomingChallenges(userId: string, callback: (challenges: any[]) => void) {
    const q = query(
      collection(db, COLLECTION_CHALLENGES),
      where("to", "==", userId)
    );

    return onSnapshot(q, (snapshot) => {
      const challenges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(challenges);
    });
  },

  listenToUserGames(userId: string, callback: (games: any[]) => void) {
    const q = query(
      collection(db, COLLECTION_GAMES),
      where("playerIds", "array-contains", userId)
    );

    return onSnapshot(q, (snapshot) => {
      const games = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(games);
    });
  },

};
