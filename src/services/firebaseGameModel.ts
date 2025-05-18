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
  Timestamp,
} from "firebase/firestore";

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
    await addDoc(collection(db, COLLECTION_CHALLENGES), {
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
      if (challengeData.status !== "pending")
        throw new Error("Already responded.");
      if (challengeData.to !== acceptingUserId)
        throw new Error("Unauthorized.");

      const newGameRef = doc(gamesRef);
      transaction.set(newGameRef, {
        playerIds: [challengeData.from, challengeData.to],
        players: [
          { uid: challengeData.from, username: challengeData.fromUsername },
          { uid: challengeData.to, username: challengeData.toUsername },
        ],
        currentTurn: challengeData.from,
        state: "in_progress",
        roundResults: {
          // Who won each round
          1: null,
          2: null,
          3: null,
        },
        isFinished: false,
        guessesSongsIDs: [],
        createdAt: new Date(),
      });

      transaction.set(challengeRef, {
        ...challengeData,
        status: "accepted",
        acceptedAt: new Date(),
        gameId: newGameRef.id,
      });

      return newGameRef.id;
    });

    return gameId;
  },

  // Decline a challenge
  async declineChallenge(challengeId: string) {
    const challengeRef = doc(db, COLLECTION_CHALLENGES, challengeId);
    const challengeSnap = await getDoc(challengeRef);

    if (!challengeSnap.exists()) throw new Error("Challenge not found.");
    const challengeData = challengeSnap.data();

    await setDoc(challengeRef, {
      ...challengeData,
      status: "declined",
      declinedAt: new Date(),
    });
  },

  // Listen to incoming challenges (real-time)
  async fetchIncomingChallenges(userId: string): Promise<any[]> {
    try {
      const q = query(
        collection(db, COLLECTION_CHALLENGES),
        where("to", "==", userId),
        where("status", "==", "pending")
      );

      const snapshot = await getDocs(q);
      const challenges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return challenges;
    } catch (error) {
      console.error("Error fetching incoming challenges:", error);
      return [];
    }
  },

    async updateGame(gameId: string, gameDataToUpdate) { 
    const gameRef = doc(db, COLLECTION_GAMES, gameId);
    try {
      await updateDoc(gameRef, gameDataToUpdate);
      console.log("Game updated successfully in Firestore:", gameId);
    } catch (error) {
      console.error("Error updating game in Firestore:", error);
      throw error; // Re-throw the error so the caller can handle it
    }
  },

  // Listen to user's games
  async fetchUserGames(userId: string): Promise<any[]> {
    try {
      const q = query(
        collection(db, COLLECTION_GAMES),
        where("playerIds", "array-contains", userId)
      );

      const snapshot = await getDocs(q);
      const games = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("this is snap", games)
      return games;
    } catch (error) {
      console.error("Error fetching user games:", error);
      return [];
    }
  },
};
