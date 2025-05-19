import { firebaseGameService } from "../services/firebaseGameModel"; // ✅ correct file
import { User as FirebaseUser } from "firebase/auth";
import {
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
} from "../services/authService";
import {
  searchUsersByUsername,
  getLBData,
  updateUserLBData,
} from "../services/firestoreUserModel";
import { SignUpData, AppUser } from "../types/user";
import { getUserFriendlyAuthErrorMessage } from "../utils/utils";

export const userModel = {
  user: null as FirebaseUser | null,
  userData: null as AppUser | null,
  challenges: [] as any[],
  games: [] as any[],
  loginAndRegistrationPromiseState: {
    isLoading: false,
    error: null,
  },

  userSearch: "",
  userSearchPromiseState: {
    isLoading: false,
    data: [] as AppUser[] | null[],
    error: null,
  },

  challengeUserState: {
    isSuccessful: false,
    loading: false,
    error: null as Error | null,
  },
  gameId: "",
  clickedGame: {},
  totalScore: 0,
  gamesPlayed: 0,
  scoreHistory: [] as number[],
  leaderboard: [] as any[],

  setClickedGame(game) {
    this.clickedGame = game;
  },

  async getLeaderboard() {
    try {
      const leaderboardData = await getLBData();
      console.log("Fetched leaderboard:", leaderboardData);
      this.leaderboard = leaderboardData;
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  },

  async updateUserLeaderBoardData(score: number) {
    this.totalScore += score;
    this.gamesPlayed += 1;
    this.scoreHistory.push(score);

    try {
      await updateUserLBData(
        this.userData.uid,
        this.userData.username,
        this.totalScore,
        this.gamesPlayed,
        this.scoreHistory
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  },

  async setGame(correctGuesses: number, guessesSongsIDs: string[]) {
    if (!this.clickedGame || !this.clickedGame.id) {
      console.error(
        "setGame failed: No game selected or clickedGame.id is missing."
      );

      return;
    }
    if (!this.user || !this.user.uid) {
      console.error("setGame failed: User is not logged in.");
      return;
    }

    // Update local state of clickedGame
    this.clickedGame.guessesSongsIDs = guessesSongsIDs;
    if (!Array.isArray(this.clickedGame.roundResults)) {
      this.clickedGame.roundResults = [];
    }

   
    this.clickedGame.roundResults.push({
      userId: this.user.uid,
      correctGuesses: correctGuesses,
    });

     console.log(this.clickedGame.roundResults)
    if (this.clickedGame.roundResults.length > 1) {
      const winner = this.clickedGame.roundResults.reduce((max, current) => {
        return current.correctGuesses > max.correctGuesses ? current : max;
      });
      const winnerUsernameIndex = this.clickedGame.players.findIndex(
        (userid) => userid.uid === winner.userId
      );
      const winnerUsername = this.clickedGame.players[winnerUsernameIndex].username;
      this.clickedGame.state = `the winner is ${winnerUsername}`;
    }
    const indexOfOpponentId = this.clickedGame.playerIds.findIndex(
      (userid) => userid !== this.user.uid
    );
    const opponentId = this.clickedGame.playerIds[indexOfOpponentId];
    // Prepare the data payload for Firestore update
    const gameDataToUpdate = {
      guessesSongsIDs: this.clickedGame.guessesSongsIDs,
      roundResults: this.clickedGame.roundResults,
      currentTurn: opponentId,
      state: this.clickedGame.state,
    };

    try {
      // Call the service to update the game in Firestore
      await firebaseGameService.updateGame(
        this.clickedGame.id,
        gameDataToUpdate
      );
      console.log("Game progress saved to Firestore successfully!");
    } catch (error) {
      console.error("Failed to save game progress to Firestore:", error);
    }
  },

  setUserSearchQuery(query: string): void {
    this.userSearch = query;
  },

  async registerAccount(email: string, username: string, password: string) {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      await signUpWithEmail(email, username, password);
      this.loginAndRegistrationPromiseState.error = null;
    } catch (error: any) {
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
    } finally {
      this.loginAndRegistrationPromiseState.isLoading = false;
    }
  },

  async login(email: string, password: string) {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      await signInWithEmail(email, password);
      this.loginAndRegistrationPromiseState.error = null;
    } catch (error) {
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
      console.error("Login failed:", error);
    } finally {
      this.loginAndRegistrationPromiseState.isLoading = false;
    }
  },

  async signOut() {
    try {
      await signOutUser();
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  },

  async getUsers() {
    this.userSearchPromiseState.isLoading = true;
    try {
      const users = await searchUsersByUsername(this.userSearch);
      this.userSearchPromiseState.data = users;
      this.userSearchPromiseState.error = null;
    } catch (error) {
      this.userSearchPromiseState.error = error;
      console.error("getUsers failed:", error);
    } finally {
      this.userSearchPromiseState.isLoading = false;
    }
  },

  async challengeUser(toUser: { uid: string; username: string }) {
    const toUserId = toUser.uid;
    this.challengeUserState.loading = true;
    this.challengeUserState.isSuccessful = false;
    this.challengeUserState.error = null;

    try {
      await firebaseGameService.challengeUser(
        this.user!.uid,
        toUserId,
        this.userData!.username,
        toUser.username
      );
      this.challengeUserState.isSuccessful = true;
    } catch (error) {
      this.challengeUserState.error = error as Error;
      console.error("Challenge failed:", error);
    } finally {
      this.challengeUserState.loading = false;
    }
  },

  async listenForChallenges() {
    if (this.user.uid) {
      try {
        const challengeList = await firebaseGameService.fetchIncomingChallenges(
          this.user.uid
        );
        console.log("Fetched challenges:", challengeList);
        this.challenges = challengeList;
        console.log("challengelist", challengeList);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
    }
  },

  async listenForGames() {
    if (this.user.uid) {
      try {
        const gameList = await firebaseGameService.fetchUserGames(
          this.user.uid
        );
        this.games = gameList;
        this.challengedUsersId = this.getOpponentIds();
        console.log("Opponent IDs:", this.challengedUsersId);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    }
  },

  getOpponentIds() {
    // Return empty array if no games or no user
    if (!this.games.length || !this.user) {
      return [];
    }

    // Create a Set to store unique opponent IDs
    const opponentIds = new Set();

    // Loop through all games
    this.games.forEach((game) => {
      // Check if playerIds exist and is an array
      if (game.playerIds && Array.isArray(game.playerIds)) {
        // Add all player IDs except the current user's ID
        game.playerIds.forEach((playerId) => {
          if (playerId !== this.user.uid) {
            opponentIds.add(playerId);
          }
        });
      }
    });

    // Convert Set to Array and return
    return Array.from(opponentIds);
  },

  async acceptChallenge(challenge: any) {
    try {
      this.gameId = await firebaseGameService.acceptChallenge(
        challenge.id,
        this.user!.uid
      );

      return true;
    } catch (error) {
      console.error("Error accepting challenge:", error);
      return false;
    }
  },

  async declineChallenge(challengeId: string) {
    try {
      await firebaseGameService.declineChallenge(challengeId);
    } catch (error) {
      console.error("Error declining challenge:", error);
    }
  },

  // Clear state on logout
  reset() {
    this.user = null;
    this.userData = null;
    this.challenges = [];
    this.games = [];
    this.challengeUserState = {
      isSuccessful: false,
      loading: false,
      error: null,
    };
    this.loginAndRegistrationPromiseState = {
      isLoading: false,
      error: null,
    };
    this.userSearch = "";
    this.userSearchPromiseState = {
      isLoading: false,
      data: [],
      error: null,
    };
  },
};
