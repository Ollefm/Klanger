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
challengedOpponents: [] as {opponentId: string, direction: string}[],
  challengeUserState: {
    isSuccessful: false,
    loading: false,
    error: null as Error | null,
  },
  gameId: "",
  clickedGame: {},
  totalScore: 0,
  gamesPlayed: 0,
  unsubscribeChallenges: null as null | (() => void),
unsubscribeGames: null as null | (() => void),
  scoreHistory: [] as number[],
  leaderboard: [] as any[],

  setClickedGame(game) {
    this.clickedGame = game;
  },

  async getLeaderboard() {
    try {
      const leaderboardData = await getLBData();
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

  async setGame(correctGuesses: number) {
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
  
    if (!Array.isArray(this.clickedGame.roundResults)) {
      this.clickedGame.roundResults = [];
    }

    this.clickedGame.roundResults.push({
      userId: this.user.uid,
      correctGuesses: correctGuesses,
    });

    if (this.clickedGame.roundResults.length > 1) {
      this.clickedGame.isFinished = true;
      const winner = this.clickedGame.roundResults.reduce((max, current) => {
        return current.correctGuesses > max.correctGuesses ? current : max;
      });
      const winnerUsernameIndex = this.clickedGame.players.findIndex(
        (userid) => userid.uid === winner.userId
      );
       this.clickedGame.winner = this.clickedGame.players[winnerUsernameIndex].username;
    }

    const indexOfOpponentId = this.clickedGame.playerIds.findIndex(
      (userid) => userid !== this.user.uid
    );
    const opponentId = this.clickedGame.playerIds[indexOfOpponentId];
    // Prepare the data payload for Firestore update
    const gameDataToUpdate = {
      roundResults: this.clickedGame.roundResults,
      currentTurn: opponentId,
      isFinished: this.clickedGame.isFinished,
      winner: this.clickedGame.winner || "",
    };

    try {
      // Call the service to update the game in Firestore
      await firebaseGameService.updateGame(
        this.clickedGame.id,
        gameDataToUpdate
      );
    } catch (error) {
      console.error("Failed to save game progress to Firestore:", error);
    }
  },

  async removeGame(){
    try{
      firebaseGameService.removeGame(this.clickedGame.id)
    }catch(error){
      console.error("something went wrong when removing game", error)
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

listenForChallenges() {
  if (this.user?.uid) {
    firebaseGameService.listenToIncomingChallenges(this.user.uid, (challengeList) => {
      this.challenges = challengeList;
    });
  }
},

listenForGames() {
  if (this.user?.uid) {
    firebaseGameService.listenToUserGames(this.user.uid, (gameList) => {
      this.games = gameList;
      this.challengedUsersId = this.getOpponentIds();
    });
  }
},


  async listenForChallengesStatus(){
    if (this.user.uid) {
      try {
        const challengeList = await firebaseGameService.listenForChallenges(this.user.uid);
        this.challengeList = challengeList;
        this.pendingChallengeIds = this.getChallengeOpponents();
      } catch (error) {
        console.error("Failed to fetch games: din lilla korv", error);
      }
    }
  },

  getChallengeOpponents() {

  if (!this.challengeList?.length || !this.user) {
    return [];
  }

  const opponentMap = new Map();

  this.challengeList.forEach((challenge) => {
    const opponentId = challenge.direction === "outgoing" 
      ? challenge.to 
      : challenge.from;
    

    opponentMap.set(opponentId, {
      opponentId: opponentId,
      direction: challenge.direction,
      status: challenge.status
    });
  });


  return Array.from(opponentMap.values());
},

  getOpponentIds() {

    if (!this.games.length || !this.user) {
      return [];
    }

    const opponentIds = new Set();

    this.games.forEach((game) => {
      if (game.playerIds && Array.isArray(game.playerIds)) {
        game.playerIds.forEach((playerId) => {
          if (playerId !== this.user.uid) {
            opponentIds.add(playerId);
          }
        });
      }
    });

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
  if (this.unsubscribeChallenges) this.unsubscribeChallenges();
  if (this.unsubscribeGames) this.unsubscribeGames();
  },
};
